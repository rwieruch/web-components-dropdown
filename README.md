# Dropdown with Web Components

[![Build Status](https://travis-ci.org/rwieruch/web-components-dropdown.svg?branch=master)](https://travis-ci.org/rwieruch/web-components-dropdown) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/web-components-dropdown.svg)](https://greenkeeper.io/)

Dropdown as Web Componment.

* [Learn how to build Web Components.](https://www.robinwieruch.de/web-components-tutorial)
* [Learn how to use Web Components in React.](https://www.robinwieruch.de/react-web-components)

## How to use:

Install: `npm install road-dropdown`

### Vanilla JS + HTML

Usage with attributes only except for function:

```
// HTML

<road-dropdown
  label="Dropdown"
  option="option2"
  options='{ "option1": { "label": "Option 1" }, "option2": { "label": "Option 2" } }'
></road-dropdown>
```

```
// JavaScript

document
  .querySelector('road-dropdown')
  .addEventListener('onChange', value => console.log(value));
```

Alternative with properties for object/array:

```
// HTML

<road-dropdown
  label="Dropdown"
  option="option2"
></road-dropdown>
```

```
// JavaScript

document.querySelector('road-dropdown').options = {
  option1: { label: 'Option 1' },
  option2: { label: 'Option 2' },
};

document
  .querySelector('road-dropdown')
  .addEventListener('onChange', value => console.log(value));
```

### React

```
import React from 'react';

// npm install road-dropdown
import 'road-dropdown';

const Dropdown = ({ label, option, options, onChange }) => {
  const ref = React.createRef();

  React.useLayoutEffect(() => {
    const handleChange = customEvent => onChange(customEvent.detail);

    ref.current.addEventListener('onChange', handleChange);

    return () => ref.current.removeEventListener('onChange', handleChange);
  }, []);

  return (
    <road-dropdown
      ref={ref}
      label={label}
      option={option}
      options={JSON.stringify(options)}
      onChange={onChange}
    />
  );
};

export default Dropdown;
```

### React with Hook

Hook to use Web Components in React Components: [use-custom-element](https://github.com/the-road-to-learn-react/use-custom-element).

```
import React from 'react';

// npm install road-dropdown
import 'road-dropdown';

// npm install use-custom-element
import useCustomElement from 'use-custom-element';

const Dropdown = props => {
  const [customElementProps, ref] = useCustomElement(props);

  return <road-dropdown {...customElementProps} ref={ref} />;
};
```

## Contribution

* `git clone git@github.com:rwieruch/web-components-dropdown.git`
* cd web-components-dropdown
* npm install
* npm start
* visit `http://localhost:8080`
