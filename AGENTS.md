# Design Preferences & UI Rules

- **Hover Animations**: Never use "pop up" or Y-axis translations (`translateY` / `y: -2`) for hover states. 
- **Scale on Hover**: Elements should only become slightly larger on hover (e.g., `scale(1.02)`) and smoothly return to their initial state when the mouse leaves.
- **Contextual/Magnetic Sibling Hover**: When hovering over an interactive card or item in a grid/list, adjacent or sibling elements should subtly fade or scale down to draw focus to the hovered element. Use the `.hover-group` and `.hover-item` CSS utilities (which utilize `:has(:hover)` and `:not(:hover)`) to enforce this.
