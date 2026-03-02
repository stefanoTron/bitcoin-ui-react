# Bitcoin UI Library

## Installation

You can install this UI library using yarn or npm:

```
yarn add bitcoin-ui-lib
```

```
npm install bitcoin-ui-lib
```

## Usage

To use this UI library in your project, import the components you need from the library and use them in your React components.

```jsx
import React from "react";
import { Input, Button } from "@timonwa/demo-ui-library";

function App() {
  return (
    <div>
      <Input
        id="name"
        disabled={false}
        label="Enter your name"
        message="This field is required"
        error={false}
        success={false}
        onChange={(e) => console.log(e.target.value)}
        placeholder="Enter your name here"
      />
      <Button
        size="medium"
        primary={true}
        disabled={false}
        text="Click me!"
        onClick={() => alert("Button clicked!")}
      />
    </div>
  );
}

export default App;
```

## Contributing

### Steps

- Fork the repository.
- Clone the repository to your local machine.
- Install the dependencies using `yarn`.
- View the components in the browser using `yarn storybook`.
- Make your changes.
- Test the changes using `yarn test`.
- Build the library using `yarn build`.
- Commit the changes and push them to your forked repository.
- Publish the package on [npm](https://www.npmjs.com/).
- Install and use the package in your project.

## License

This demo UI library is licensed under the [MIT License](https://github.com/Timonwa/demo-ui-library/blob/main/license).

## Connect

More of my articles can be found in [Timonwa's Notes](https://blog.timonwa.com). Connect with me on Twitter: [@timonwa\_](https://twitter.com/timonwa_)
