# Dropdown with Web Components

[![Build Status](https://travis-ci.org/rwieruch/web-components-dropdown.svg?branch=master)](https://travis-ci.org/rwieruch/web-components-dropdown) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/web-components-dropdown.svg)](https://greenkeeper.io/)

Dropdown built as Web Componment.

## How to use:

Install: `npm install road-dropdown`

### Usage Vanilla JS + HTML

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

### Usage React

```
import React from 'react';
import 'road-dropdown';

const Dropdown = ({ label, option, options, onChange }) => {
  const ref = React.createRef();

  React.useEffect(() => {
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

## Contribution

* `git clone git@github.com:rwieruch/web-components-dropdown.git`
* cd web-components-dropdown
* npm install
* npm start
* visit `http://localhost:8080`
