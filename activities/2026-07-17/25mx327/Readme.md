# Dynamic JSON-Driven Form Generator

## Problem Statement

Build a dynamic JSON-driven form generator in React/Next.js that renders a complex nested questionnaire. The application should support schema-based validation and conditional rendering of fields.

Example requirements:
- Age must be greater than 18.
- If "Employed" is selected, display the "Company Name" field.

---

## Features

- Dynamic form generation from JSON schema
- Support for nested form structures
- Validation based on schema rules
- Conditional rendering of fields
- Modular React component architecture
- Easily extendable JSON schema

---

## Architecture

The application follows a component-based architecture.

Components:

- **App**
  - Loads the JSON schema.
  - Maintains form state.

- **DynamicForm**
  - Reads the schema recursively.
  - Generates form elements dynamically.

- **FieldRenderer**
  - Renders different input types such as:
    - Text
    - Number
    - Checkbox
    - Select

- **Validation Engine**
  - Checks required fields.
  - Validates age > 18.
  - Displays validation errors.

- **Conditional Logic Engine**
  - Evaluates conditions defined in the schema.
  - Example:
    - If Employed = true
    - Show Company Name field.

---

## Time Complexity (Big-O)

Rendering the form:
- O(n)
- Each field in the schema is processed once.

Validation:
- O(n)
- Every field is checked against validation rules.

Conditional Rendering:
- O(n)
- Each conditional field is evaluated once during rendering.

Overall Complexity:
- O(n)

where n is the number of fields in the JSON schema.

---

## Advantages

- Easy to extend by modifying only the JSON schema.
- No need to hardcode form fields.
- Reusable components.
- Cleaner architecture.
- Scalable for enterprise applications.

---

## Future Improvements

- Multi-step forms
- File upload support
- API integration
- Custom validation rules
- Drag-and-drop form builder
- Database persistence

---

## Technologies Used

- React / Next.js
- JavaScript
- JSON
- CSS
