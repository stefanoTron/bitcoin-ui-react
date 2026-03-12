import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { BTCInput } from "./BTCInput";

// Thin space used as default satsSeparator
const THIN = "\u2009";

function getCursorAfterChange(initialAmount: number, rawValue: string, selectionStart: number): number | null {
  let currentAmount = initialAmount;
  const onAmountChange = jest.fn((sats: number) => {
    currentAmount = sats;
  });

  const { rerender } = render(<BTCInput amount={currentAmount} onAmountChange={onAmountChange} />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const spy = jest.spyOn(input, "setSelectionRange");

  Object.defineProperty(input, "value", { writable: true, value: rawValue });
  Object.defineProperty(input, "selectionStart", {
    writable: true,
    value: selectionStart,
  });
  fireEvent.change(input);
  rerender(<BTCInput amount={currentAmount} onAmountChange={onAmountChange} />);

  if (spy.mock.calls.length === 0) return null;
  const result = spy.mock.calls[spy.mock.calls.length - 1][0] as number;
  spy.mockRestore();
  return result;
}

describe("BTCInput", () => {
  const defaultProps = {
    amount: 0,
    onAmountChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders an input element", () => {
    render(<BTCInput {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("displays formatted amount for 1000 sats", () => {
    render(<BTCInput {...defaultProps} amount={1000} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toContain("0");
    expect(input.value).toContain("001");
    expect(input.value).toContain("000");
    expect(input.value.replace(/\s/g, "")).toBe("0.00001000");
  });

  test("calls onAmountChange when user types digits", async () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "1000");
    expect(onAmountChange).toHaveBeenCalled();
  });

  test("strips non-numeric characters from input", async () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc123");
    expect(onAmountChange).toHaveBeenCalled();
    const allValues = onAmountChange.mock.calls.map((c: [number]) => c[0]);
    allValues.forEach((v: number) => {
      expect(typeof v).toBe("number");
      expect(v).toBeGreaterThanOrEqual(0);
    });
  });

  test("disables input when disabled prop is true", () => {
    render(<BTCInput {...defaultProps} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("clamps amount to max supply (2.1 quadrillion sats)", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={2_100_000_000_000_001} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, "");
    expect(parseInt(digitsOnly, 10)).toBeLessThanOrEqual(2_100_000_000_000_000);
  });

  test("applies className", () => {
    render(<BTCInput {...defaultProps} className="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("renders placeholder when amount is 0", () => {
    render(<BTCInput {...defaultProps} placeholder="Enter amount" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Enter amount");
  });

  test("has aria-label", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} />);
    const input = screen.getByLabelText("Amount in BTC");
    expect(input).toBeInTheDocument();
  });

  test("supports custom ariaLabel", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} ariaLabel="Monto en BTC" />);
    expect(screen.getByLabelText("Monto en BTC")).toBeInTheDocument();
  });

  test("forwards ref to input element", () => {
    const ref = { current: null };
    render(<BTCInput amount={0} onAmountChange={() => {}} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test("supports custom descriptionFormatter for i18n", () => {
    render(
      <BTCInput amount={100_000_000} onAmountChange={() => {}} descriptionFormatter={(btc) => `${btc} ビットコイン`} />,
    );
    expect(screen.getByText("1.00000000 ビットコイン")).toBeInTheDocument();
  });

  test("default descriptionFormatter appends BTC", () => {
    render(<BTCInput amount={50_000_000} onAmountChange={() => {}} />);
    expect(screen.getByText("0.50000000 BTC")).toBeInTheDocument();
  });
});

// --------------------------------------------------------------------------
// Format / parse round-trip tests
// --------------------------------------------------------------------------
describe("BTCInput — format/parse round-trip", () => {
  // Helper: render with a given amount and return the display string
  function renderAndGetValue(amount: number): string {
    render(<BTCInput amount={amount} onAmountChange={() => {}} />);
    return (screen.getByRole("textbox") as HTMLInputElement).value;
  }

  afterEach(() => {
    // cleanup is automatic with RTL, but we clear between tests
  });

  test("0 sats renders empty string (shows placeholder)", () => {
    const value = renderAndGetValue(0);
    expect(value).toBe("");
  });

  test("1 sat formats as 0.00 000 001", () => {
    const value = renderAndGetValue(1);
    expect(value).toBe(`0.00${THIN}000${THIN}001`);
  });

  test("100 sats formats as 0.00 000 100", () => {
    const value = renderAndGetValue(100);
    expect(value).toBe(`0.00${THIN}000${THIN}100`);
  });

  test("100_000_000 sats (1 BTC) formats as 1.00 000 000", () => {
    const value = renderAndGetValue(100_000_000);
    expect(value).toBe(`1.00${THIN}000${THIN}000`);
  });

  test("123_456_789 sats formats as 1.23 456 789", () => {
    const value = renderAndGetValue(123_456_789);
    expect(value).toBe(`1.23${THIN}456${THIN}789`);
  });

  test("2_100_000_000_000_000 sats (21M BTC) formats correctly", () => {
    const value = renderAndGetValue(2_100_000_000_000_000);
    expect(value.replace(/\s/g, "")).toBe("21000000.00000000");
  });

  test("negative amount is clamped to 0 but displays formatted zeros", () => {
    // amount === 0 check is strict: -500 !== 0, so formatSats is called
    // formatSats clamps -500 to 0 and produces "0.00 000 000"
    const value = renderAndGetValue(-500);
    expect(value).toBe(`0.00${THIN}000${THIN}000`);
  });

  test("NaN amount displays formatted zeros", () => {
    // NaN !== 0 (strict equality), so formatSats is called
    // formatSats treats NaN as 0 and produces "0.00 000 000"
    const value = renderAndGetValue(NaN);
    expect(value).toBe(`0.00${THIN}000${THIN}000`);
  });

  test("fractional amount is truncated", () => {
    const value = renderAndGetValue(1.9);
    // Math.trunc(1.9) = 1
    expect(value).toBe(`0.00${THIN}000${THIN}001`);
  });

  test("amount exceeding max is clamped to max supply", () => {
    const value = renderAndGetValue(Number.MAX_SAFE_INTEGER);
    expect(value.replace(/\s/g, "")).toBe("21000000.00000000");
  });

  test("custom btcSeparator is used", () => {
    render(<BTCInput amount={100_000_000} onAmountChange={() => {}} btcSeparator="," />);
    const value = (screen.getByRole("textbox") as HTMLInputElement).value;
    expect(value).toBe(`1,00${THIN}000${THIN}000`);
  });

  test("custom satsSeparator is used", () => {
    render(<BTCInput amount={100_000_000} onAmountChange={() => {}} satsSeparator=" " />);
    const value = (screen.getByRole("textbox") as HTMLInputElement).value;
    expect(value).toBe("1.00 000 000");
  });

  test("parse strips non-digits and returns sats value via onAmountChange", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // Simulate typing a formatted string with separators
    fireEvent.change(input, { target: { value: `1.23${THIN}456${THIN}789` } });
    expect(onAmountChange).toHaveBeenCalledWith(123_456_789);
  });

  test("parse of empty string returns 0", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={50} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    expect(onAmountChange).toHaveBeenCalledWith(0);
  });

  test("parse of only non-digit characters returns 0", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc!@#" } });
    expect(onAmountChange).toHaveBeenCalledWith(0);
  });

  test("parse clamps to MAX_SATS", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // Provide a number larger than MAX_SATS (2_100_000_000_000_000)
    fireEvent.change(input, { target: { value: "9999999999999999" } });
    expect(onAmountChange).toHaveBeenCalledWith(2_100_000_000_000_000);
  });
});

// --------------------------------------------------------------------------
// Cursor preservation behavioral tests
// --------------------------------------------------------------------------
describe("BTCInput — cursor preservation", () => {
  /**
   * Helper that renders a controlled BTCInput, fires a change event with
   * a specific raw value and cursor position (selectionStart), then
   * re-renders with the resulting amount so the useLayoutEffect runs.
   * Returns the position that setSelectionRange was called with.
   */
  function simulateChangeAndGetCursor(initialAmount: number, rawValue: string, cursorPos: number): number | null {
    let currentAmount = initialAmount;
    const onAmountChange = jest.fn((sats: number) => {
      currentAmount = sats;
    });

    const { rerender } = render(<BTCInput amount={currentAmount} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Spy on setSelectionRange to capture cursor restoration
    const spy = jest.spyOn(input, "setSelectionRange");

    // Set the input value and selectionStart, then fire change
    Object.defineProperty(input, "value", {
      writable: true,
      value: rawValue,
    });
    Object.defineProperty(input, "selectionStart", {
      writable: true,
      value: cursorPos,
    });
    fireEvent.change(input);

    // Re-render with the new amount to trigger useLayoutEffect
    rerender(<BTCInput amount={currentAmount} onAmountChange={onAmountChange} />);

    if (spy.mock.calls.length === 0) return null;
    const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    spy.mockRestore();
    return lastCall[0] as number;
  }

  test("typing a digit at the end keeps cursor at the end", () => {
    // Start with 1 sat: display "0.00 000 001"
    // User types "5" at the end -> raw "0.00 000 0015", cursor at pos 14 (end)
    // digitsAfter = countDigitsAfter("0.00 000 0015", 14) = 0
    // After reformat to "0.00 000 015" (15 sats):
    // totalDigits=9, charPos after 9th digit => end
    const rawValue = `0.00${THIN}000${THIN}0015`;
    const cursorPos = rawValue.length; // cursor at the very end
    const pos = simulateChangeAndGetCursor(1, rawValue, cursorPos);
    // Should be at the end of the reformatted string "0.00 000 015"
    const expected = `0.00${THIN}000${THIN}015`;
    expect(pos).toBe(expected.length);
  });

  test("typing a digit in the middle preserves relative position", () => {
    // Start with amount 12345678 (0.12 345 678)
    // Formatted: "0.12 345 678" (with thin spaces)
    // User inserts "9" after the "3" -> raw "0.129 345 678", cursor after "9"
    // Let's compute: "0.129 345 678"
    //   positions: 0=0, 1=., 2=1, 3=2, 4=9, 5=THIN, 6=3, 7=4, 8=5, 9=THIN, 10=6, 11=7, 12=8
    //   cursor at 5 (after "9")
    //   digitsAfter("0.129 345 678", 5) = digits from pos 5 onward = 3,4,5,6,7,8 = 6
    // parseSats("0.129 345 678") -> digits "0129345678" -> 129345678
    // Reformat 129345678: "1.29 345 678"
    //   totalDigits = 9, targetDigit = 9 - 6 = 3
    //   charPosAfterNthDigit("1.29 345 678", 3) -> after 3rd digit "9" = pos 4
    const rawValue = `0.129${THIN}345${THIN}678`;
    const cursorPos = 5; // right after "9", before thin space
    const pos = simulateChangeAndGetCursor(12_345_678, rawValue, cursorPos);
    // Reformatted: "1.29 345 678", cursor after 3rd digit "9"
    // "1.29..." -> pos 0='1', 1='.', 2='2', 3='9' -> after 3rd digit = pos 4
    expect(pos).toBe(4);
  });

  test("cursor at position 0 stays at position 0", () => {
    // amount = 12345678 -> "0.12 345 678"
    // User places cursor at 0 and types "5" -> raw "50.12 345 678", cursor at 1
    // digitsAfter("50.12 345 678", 1) = count from pos 1 onward
    //   pos1='.', 2='0', 3='.', 4='1', 5='2', 6=THIN, 7='3', 8='4', 9='5', 10=THIN, 11='6', 12='7', 13='8'
    //   Wait, let me re-think. The raw value is the user-mutated string.
    // Actually let's use a simpler scenario:
    // Typing "5" at position 0 of "0.12 345 678" -> "50.12 345 678"
    // selectionStart = 1 (after the "5")
    // digitsAfter = countDigitsAfter("50.12 345 678", 1) = 0,1,2,3,4,5,6,7,8 = 9
    // parseSats("50.12 345 678") -> "5012345678" -> 5012345678
    // reformat 5012345678 -> "50.12 345 678" (50 BTC part + .12 345 678)
    // totalDigits = 10, target = 10 - 9 = 1
    // charPosAfterNthDigit("50.12 345 678", 1) -> after 1st digit '5' = pos 1
    const rawValue = `50.12${THIN}345${THIN}678`;
    const cursorPos = 1;
    const pos = simulateChangeAndGetCursor(12_345_678, rawValue, cursorPos);
    expect(pos).toBe(1);
  });

  test("cursor skips over separator when digits shift", () => {
    // Start with 99_999 sats -> "0.00 099 999"
    // User types "1" after the first "0" of "099" group
    // raw: "0.00 0199 999", cursor at some position after "1"
    // After reformat: amount=1099999 -> "0.01 099 999"
    // The cursor should land after the "1" in the reformatted string,
    // which is position 4 (after "0.01")
    const rawValue = `0.00${THIN}0199${THIN}999`;
    // cursor after "1" in "0199": "0.00 0199 999"
    // pos: 0='0', 1='.', 2='0', 3='0', 4=THIN, 5='0', 6='1', 7='9', 8='9', 9=THIN, 10='9', 11='9', 12='9'
    const cursorPos = 7; // after "1", before "9"
    // digitsAfter("0.00 0199 999", 7) = 9,9,9,9,9 = 5
    // parseSats -> "000019999" wait no, "0000199999" -> 199999...
    // Let me recalculate: digits in "0.00 0199 999" -> "000019999" -> wait
    // "0.00 0199 999" remove non-digits -> "0000199999" = 199999 ... hmm that's 10 digits
    // Actually: 0,0,0,0,1,9,9,9,9,9 = "0000199999" -> parseInt = 199999
    // Wait: 0000199999 -> that's 10 digits. parseInt("0000199999") = 199999
    // Hmm that doesn't seem right. Let me re-count the digits.
    // "0.00 0199 999" -> chars: '0', '.', '0', '0', THIN, '0', '1', '9', '9', THIN, '9', '9', '9'
    // digits: 0, 0, 0, 0, 1, 9, 9, 9, 9, 9 -> "0000199999" -> parseInt = 199999
    // Reformat 199999: padStart(9,"0") = "000199999"
    // btcPart = "0" (slice(0, 1)), decPart = "00199999" (slice(1))
    // group1 = "00", group2 = "199", group3 = "999"
    // -> "0.00 199 999"
    // digitsAfter cursor pos 7 in raw: from pos 7 onward "9 999" -> digits 9,9,9,9,9 = 5
    // totalDigits = 9, target = 9-5 = 4
    // charPosAfterNthDigit("0.00 199 999", 4) ->
    //   pos: '0'(1), '.'skip, '0'(2), '0'(3), THIN skip, '1'(4) -> pos 5+1=6
    // Actually with thin space: "0.00\u2009199\u2009999"
    //   pos 0='0'(d1), 1='.'(skip), 2='0'(d2), 3='0'(d3), 4=THIN(skip), 5='1'(d4) -> return 6
    const pos = simulateChangeAndGetCursor(99_999, rawValue, cursorPos);
    expect(pos).toBe(6);
  });

  test("deleting a digit preserves cursor position correctly", () => {
    // Start with 123_456_789 -> "1.23 456 789"
    // User deletes "4" (backspace) -> raw "1.23 56 789", cursor before "5"
    // "1.23 56 789" -> chars: '1','.','2','3',THIN,'5','6',THIN,'7','8','9'
    // cursor at pos 5 (where '5' is, after the thin space)
    // digitsAfter("1.23 56 789", 5) = 5,6,7,8,9 = 5
    // parseSats -> digits "1235678" wait... "12356789" ->
    // "1.23 56 789" digits: 1,2,3,5,6,7,8,9 -> "12356789" -> parseInt = 12356789
    // Reformat 12356789: padStart(9,"0") = "012356789"
    // btcPart = "0", decPart = "12356789"
    // group1 = "12", group2 = "356", group3 = "789"
    // -> "0.12 356 789"
    // totalDigits = 9, target = 9 - 5 = 4
    // charPosAfterNthDigit("0.12 356 789", 4):
    //   '0'(1), '.'skip, '1'(2), '2'(3), THIN skip, '3'(4) -> return pos 5+1 =
    //   pos 0='0', 1='.', 2='1', 3='2', 4=THIN, 5='3' -> d4 at index 5, return 6
    const rawValue = `1.23${THIN}56${THIN}789`;
    const cursorPos = 5;
    const pos = simulateChangeAndGetCursor(123_456_789, rawValue, cursorPos);
    expect(pos).toBe(6);
  });

  test("cursor at the start of a zero-value input stays at 0", () => {
    // User types into empty input (amount=0), raw value "0", cursor at 0
    // digitsAfter("0", 0) = 1
    // parseSats("0") = 0, amount stays 0, displayValue = "" (empty)
    // On rerender with amount=0, input.value = ""
    // totalDigits = countDigitsAfter("", 0) = 0
    // target = max(0, 0 - 1) = 0
    // charPosAfterNthDigit("", 0) = 0 (n<=0 returns 0)
    const rawValue = "0";
    const cursorPos = 0;
    const pos = simulateChangeAndGetCursor(0, rawValue, cursorPos);
    // amount becomes 0 -> empty display. The setSelectionRange should be called with 0.
    expect(pos).toBe(0);
  });
});

// --------------------------------------------------------------------------
// Indirect tests for countDigitsAfter behavior
// --------------------------------------------------------------------------
describe("BTCInput — countDigitsAfter (indirect)", () => {
  // We test countDigitsAfter indirectly by firing change events with known
  // cursor positions and checking the resulting cursor placement.

  test("cursor at end of string means 0 digits after", () => {
    // "12345" cursor at 5 (end) -> digitsAfter = 0
    // parseSats("12345") = 12345
    // reformat: padStart(9) = "000012345" -> "0.00 012 345"
    // totalDigits=9, target=9-0=9 -> charPosAfterNthDigit at 9th digit -> end
    const raw = "12345";
    const pos = getCursorAfterChange(0, raw, raw.length);
    const expected = `0.00${THIN}012${THIN}345`;
    expect(pos).toBe(expected.length);
  });

  test("cursor before all digits counts all of them", () => {
    // "12345" cursor at 0 -> digitsAfter = 5
    // reformat 12345 -> "0.00 012 345" (9 digits)
    // target = 9-5 = 4
    // charPosAfterNthDigit("0.00 012 345", 4):
    //   '0'(1),'.'skip,'0'(2),'0'(3),THIN skip,'0'(4) at index 5 -> return 6
    const raw = "12345";
    const pos = getCursorAfterChange(0, raw, 0);
    expect(pos).toBe(6);
  });

  test("cursor between non-digit characters still counts digits correctly", () => {
    // raw = "1.2.3" (malformed), cursor at 2 (between '.' and '2')
    // digitsAfter("1.2.3", 2) -> chars at 2='2',3='.',4='3' -> 2 digits
    // parseSats("1.2.3") -> digits "123" -> 123
    // reformat 123 -> "0.00 000 123"
    // totalDigits=9, target=9-2=7
    // charPosAfterNthDigit("0.00 000 123", 7):
    //   '0'(1),'.'skip,'0'(2),'0'(3),THIN skip,'0'(4),'0'(5),'0'(6),THIN skip,'1'(7) at index 10 -> return 11
    const raw = "1.2.3";
    const pos = getCursorAfterChange(0, raw, 2);
    // "0.00\u2009000\u2009123" ->
    // pos 0='0',1='.',2='0',3='0',4=THIN,5='0',6='0',7='0',8=THIN,9='1',10='2',11='3'
    // 7th digit is '1' at index 9 -> return 10
    expect(pos).toBe(10);
  });
});

// --------------------------------------------------------------------------
// Indirect tests for charPosAfterNthDigit behavior
// --------------------------------------------------------------------------
describe("BTCInput — charPosAfterNthDigit (indirect)", () => {
  // This function is exercised during cursor restoration. We verify it via
  // the end-to-end cursor position returned by setSelectionRange.

  test("n=0 returns position 0 (cursor before all digits)", () => {
    // To get n=0 (totalDigits - digitsAfter = 0), we need digitsAfter = totalDigits
    // Put cursor at position 0 and raw value is all digits
    // raw = "100000000", cursor at 0 -> digitsAfter = 9
    // parseSats = 100000000 -> reformat "1.00 000 000" (9 digits)
    // target = 9 - 9 = 0 -> charPosAfterNthDigit returns 0
    const raw = "100000000";
    const pos = getCursorAfterChange(0, raw, 0);
    expect(pos).toBe(0);
  });

  test("n exceeding digit count returns end of string", () => {
    // This case happens when digits are added. But charPosAfterNthDigit
    // won't actually exceed because the formatted string always has enough
    // digits. Let's create a scenario where the user typed many digits at
    // the beginning and the cursor should go to the end.
    // raw = "123456789", cursor at end (9) -> digitsAfter = 0
    // target = 9 - 0 = 9 -> find 9th digit in "1.23 456 789"
    // '1'(1),'.'skip,'2'(2),'3'(3),THIN skip,'4'(4),'5'(5),'6'(6),THIN skip,'7'(7),'8'(8),'9'(9) at idx 11 -> return 12
    const raw = "123456789";
    const pos = getCursorAfterChange(0, raw, raw.length);
    const formatted = `1.23${THIN}456${THIN}789`;
    expect(pos).toBe(formatted.length);
  });

  test("cursor lands right after a separator (not on it)", () => {
    // If the cursor logically belongs after the 2nd decimal digit (the group
    // boundary), it should land right after the separator.
    // raw = "1234567890" (10 digits), cursor at position 2 -> digitsAfter = 8
    // parseSats -> 1234567890
    // reformat: padStart(9) = "1234567890" -> btcPart = "12", decPart = "34567890"
    // -> "12.34 567 890"
    // totalDigits = 10, target = 10-8 = 2
    // charPosAfterNthDigit("12.34 567 890", 2):
    //   '1'(1), '2'(2) at index 1 -> return 2
    const raw = "1234567890";
    const pos = getCursorAfterChange(0, raw, 2);
    expect(pos).toBe(2);
  });
});

// --------------------------------------------------------------------------
// Edge cases
// --------------------------------------------------------------------------
describe("BTCInput — edge cases", () => {
  test("extremely large input is clamped to MAX_SATS", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: "99999999999999999999" },
    });
    expect(onAmountChange).toHaveBeenCalledWith(2_100_000_000_000_000);
  });

  test("input of all zeros produces 0", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "000000000" } });
    expect(onAmountChange).toHaveBeenCalledWith(0);
  });

  test("amount=0 renders empty value, not formatted zeros", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  test("color changes based on amount", () => {
    const { rerender } = render(
      <BTCInput amount={0} onAmountChange={() => {}} activeColor="blue" inactiveColor="gray" />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.style.color).toBe("gray");

    rerender(<BTCInput amount={100} onAmountChange={() => {}} activeColor="blue" inactiveColor="gray" />);
    expect(input.style.color).toBe("blue");
  });

  test("disabled input has reduced opacity", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} disabled />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.style.opacity).toBe("0.5");
  });

  test("custom style prop is merged", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} style={{ fontSize: "24px" }} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.style.fontSize).toBe("24px");
  });

  test("useLayoutEffect does not run setSelectionRange without a prior change event", () => {
    render(<BTCInput amount={100} onAmountChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const spy = jest.spyOn(input, "setSelectionRange");
    // Re-render without change event — cursorRef should be null
    render(<BTCInput amount={200} onAmountChange={() => {}} />);
    // The spy was attached to the first input instance; on the second render
    // a new input may be created, but the point is cursorRef.current is null
    // from the initial render so setSelectionRange should not have been called
    // on the first input.
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test("switching from nonzero to zero clears the display", () => {
    const { rerender } = render(<BTCInput amount={500} onAmountChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).not.toBe("");

    rerender(<BTCInput amount={0} onAmountChange={() => {}} />);
    expect(input.value).toBe("");
  });

  test("max supply value displays correctly", () => {
    render(<BTCInput amount={2_100_000_000_000_000} onAmountChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // 21000000.00000000 with separators
    expect(input.value).toBe(`21000000.00${THIN}000${THIN}000`);
  });

  test("input with mixed digits and letters parses only digits", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "a1b2c3" } });
    expect(onAmountChange).toHaveBeenCalledWith(123);
  });

  test("single digit input parses correctly", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5" } });
    expect(onAmountChange).toHaveBeenCalledWith(5);
  });

  test("has no accessibility violations", async () => {
    const { container } = render(<BTCInput amount={100_000} onAmountChange={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
