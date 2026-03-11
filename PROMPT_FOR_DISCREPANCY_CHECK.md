# PROMPT: Compare Implementation with Figma Design

Copy and paste the following prompt into your AI chat in the AitiGuruTestingJob project:

---

## PROMPT START

I need you to compare my current implementation with the Figma design and identify all discrepancies.

### 📋 Context

**Figma Design File**: Aiti Guru Test Assignment  
**Frame to Analyze**: Авторизация (Desktop) - Authorization/Login Page  
**Figma URL**: https://www.figma.com/design/bmPM02YBMRQbGHpSqzN2kw/Aiti-Guru-Test-Assignment?node-id=1046-50

### 📁 Available Data

I have exported all Figma data to `figma-data/` directory:

1. **Design Tokens**: `figma-data/tokens/design-system.css` - Contains all colors, spacing, border radius
2. **Raw Data**: `figma-data/raw/design-system.json` - Complete component structure with positions and sizes
3. **Analysis**: `figma-data/analysis/figma-analysis-report.md` - Pre-identified issues
4. **Summary**: `FIGMA_EXPORT_SUMMARY.md` - Overview of exported data

### 🎯 What I Need You To Do

1. **Read the Figma data** from `figma-data/` directory
2. **Read my current implementation** from `src/` directory
3. **Compare and identify discrepancies** in:
   - **Colors** - Are my colors matching Figma hex values?
   - **Typography** - Font sizes, weights, line heights
   - **Spacing** - Padding, margins, gaps between elements
   - **Layout** - Positions, sizes, alignment
   - **Border Radius** - Corner roundings
   - **Components** - Buttons, inputs, labels styling
4. **Create a detailed report** listing:
   - Each discrepancy with Figma value vs My value
   - Severity (Critical/High/Medium/Low)
   - Suggested fix

### 📊 Key Design System Values

**Primary Color**: `#242EDB`  
**Background**: `#FFFFFF` (white card), `#F6F6F6` (page bg)  
**Text**: `#000000` (primary), `#999999` (muted)  
**Card Size**: ~527x716px with 40px border radius  
**Typography**: Inter/Cairo font family  

### ⚠️ Known Issues from Figma Analysis

1. Spacing inconsistencies in design (micro-values like 1.1px) - Use standard 8px grid
2. Non-semantic color names - Map to semantic names
3. 8 different border radius values - Standardize to 4-5
4. 5 fonts declared - Verify which are actually used

### 📝 Output Format

Please provide:

```markdown
## Discrepancy Report

### 🔴 Critical Issues (Must Fix)
1. **[Element Name]**
   - Figma: [value]
   - Current: [value]
   - Fix: [specific CSS/code change]

### 🟠 High Priority
...

### 🟡 Medium Priority
...

### 🟢 Low Priority
...

## Summary
- Total discrepancies: [X]
- Critical: [X]
- High: [X]
- Medium: [X]
- Low: [X]
```

### 🔍 Files to Check

Please read:
- `figma-data/tokens/design-system.css` - Reference tokens
- `figma-data/raw/design-system.json` - Component structure
- `src/**/*.{css,scss,tsx,jsx,vue}` - My implementation
- Any style files in project root

Focus especially on the **Авторизация (Authorization)** frame structure.

---

## PROMPT END

---

## 💡 Tips for Best Results

### 1. **If AI Doesn't Check Files Automatically**
Add this to the prompt:
```
IMPORTANT: Please actually READ the files I mentioned. Use the Read tool to open:
1. figma-data/tokens/design-system.css
2. figma-data/raw/design-system.json  
3. My implementation files in src/
```

### 2. **If You Want Specific Frame Analysis**
The authorization frame has ID `1046:50` in Figma. You can say:
```
Focus on the authorization frame (ID: 1046:50, name: "Авторизация (Desktop)") which is 527x716px with white background.
```

### 3. **If You Want Pixel-Perfect Comparison**
Add:
```
Be pixel-perfect in your comparison. Check exact hex colors, pixel values for spacing, and precise font sizes.
```

### 4. **For Actionable Fixes**
Add:
```
For each discrepancy, provide the exact code I need to change, not just descriptions.
```

---

## 📋 One-Liner Version

If you want a shorter prompt, use this:

```
Compare my current implementation in src/ with the Figma design data in figma-data/. Read design-system.css and design-system.json, then identify all discrepancies in colors, spacing, typography, and layout. Provide a detailed report with fixes for the Авторизация (Authorization) frame.
```

---

## ✅ Expected Output

The AI should provide:
1. ✅ Detailed discrepancy list
2. ✅ Figma vs Implementation comparison
3. ✅ Severity classification
4. ✅ Specific code fixes
5. ✅ Summary statistics

**Save this prompt and use it whenever you need to check your implementation against Figma!** 🎯
