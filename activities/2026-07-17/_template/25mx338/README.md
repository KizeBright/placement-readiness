# Dynamic JSON-Driven Form Generator

## Technical Challenge – Deloitte USI

## Project Overview

This project implements a dynamic JSON-driven form generator using React and Next.js. The application renders forms entirely from a JSON schema instead of hardcoded components, making it scalable and reusable for different consulting clients.

The form supports:

- Dynamic rendering from JSON
- Nested questionnaires
- Conditional field rendering
- Validation rules
- Recursive form generation
- Clean and modular architecture

---

# Problem Statement

Develop a dynamic questionnaire system that can generate forms from a JSON schema while supporting:

- Nested sections
- Validation rules
- Conditional logic
- Reusability
- Scalability

Example:

If the user selects **Employed = Yes**, the **Company Name** field becomes visible.

If **Age < 18**, validation prevents submission.

---

# Features

✅ JSON-driven UI

✅ Recursive rendering of nested forms

✅ Required field validation

✅ Numeric validation (Age > 18)

✅ Conditional field visibility

✅ Modular React components

✅ Easy to extend for additional field types

---

# Technology Stack

- Next.js
- React
- TypeScript
- CSS / Tailwind CSS (optional)

---

# Project Structure

```
project/
│
├── app/
│
├── components/
│     FormGenerator.tsx
│     FormField.tsx
│     ValidationMessage.tsx
│
├── data/
│     schema.json
│
├── lib/
│     validator.ts
│     conditionalLogic.ts
│
├── types/
│
├── README.md
├── reflection.md
└── prompts.md
```

---

# Architecture

```
JSON Schema
      │
      ▼
Form Generator
      │
      ▼
Field Renderer
      │
      ▼
React State
      │
      ▼
Validation Engine
      │
      ▼
Conditional Logic
      │
      ▼
Rendered UI
```

### Component Responsibilities

### FormGenerator

- Reads JSON schema
- Iterates through fields
- Maintains form state

### FormField

- Renders individual field
- Handles user input

### Validation Engine

- Required validation
- Age validation
- Error generation

### Conditional Logic Engine

Checks visibility conditions.

Example:

```
if employed == true

show Company Name

else

hide Company Name
```

---

# Sample JSON Schema

```json
{
  "fields": [
    {
      "id": "age",
      "type": "number",
      "label": "Age",
      "validation": {
        "min": 18
      }
    },
    {
      "id": "employed",
      "type": "checkbox",
      "label": "Currently Employed"
    },
    {
      "id": "company",
      "type": "text",
      "label": "Company Name",
      "visibleIf": {
        "field": "employed",
        "equals": true
      }
    }
  ]
}
```

---

# Validation Rules

| Field | Rule |
|--------|------|
| Age | Must be greater than 18 |
| Name | Required |
| Company Name | Required only if employed |
| Email | Valid email format (optional extension) |

---

# Algorithm

1. Load JSON schema.

2. Traverse every field.

3. Check visibility condition.

4. Render field.

5. Store values in state.

6. Validate on change and on submit.

7. Display validation errors.

---

# Time Complexity

## Rendering

Every field is visited once.

**Time Complexity**

```
O(n)
```

where **n = number of fields**

---

## Validation

Each field is validated once.

```
O(n)
```

---

## Conditional Lookup

Field lookup uses object access.

```
O(1)
```

---

## Recursive Nested Forms

Every node is traversed exactly once.

```
O(n)
```

---

## Space Complexity

Form state stores every field value.

```
O(n)
```

---

# Edge Cases Tested

- Empty required fields
- Age below 18
- Age exactly 18
- Company field hidden correctly
- Nested groups
- Missing JSON properties
- Invalid user input
- Large forms with many fields

---

# Trade-offs

### Advantages

- Highly reusable
- Easy to maintain
- No hardcoded UI
- Easy to extend

### Limitations

- Runtime parsing introduces small overhead.
- Complex nested schemas increase recursion depth.
- Large forms may require optimization using memoization.

---

# Future Improvements

- React Hook Form integration
- Zod/Yup schema validation
- Multi-step forms
- File upload fields
- Date picker
- API submission
- Dynamic themes
- Drag-and-drop form builder

---

# How to Run

```bash
npm install

npm run dev
```

Open:

```
http://localhost:3000
```

---

# Resources

- React Documentation
- Next.js Documentation
- TypeScript Handbook
- JSON Schema Documentation
