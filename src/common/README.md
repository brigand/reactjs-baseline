## src/common

Put reusable components here.  They shouldn't be requiring
any files outside of the common directory.  

### Directory Structure

    common/
        component-name/
            component-name.jsx
            component-name.styl
            sub-component/
                sub-component.jsx
                sub-component.styl

### Use

Anywhere in the src directory, `require("common/component-name")` will
resolve to `src/common/component-name/component-name.jsx`.  Stylus (`*.styl`) files will automatically be included in your style sheet.