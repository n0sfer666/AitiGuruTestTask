# 🎯 READY-TO-USE PROMPT

## Quick Version (Copy & Paste This)

```
Compare my current implementation in src/ with the Figma design data in figma-data/. Read figma-data/tokens/design-system.css and figma-data/raw/design-system.json, then identify all discrepancies in colors, spacing, typography, and layout. Focus on the Авторизация (Authorization) frame. Provide specific code fixes for each issue found.
```

---

## Full Version (For Detailed Analysis)

Copy everything below and paste into your AI chat:

---

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

## 💡 How to Use

### Step 1: Open Your Project
```bash
cd /Users/n0sfer/_dev/AitiGuruTestingJob
```

### Step 2: Start AI Chat
Open your AI assistant in this directory.

### Step 3: Paste the Prompt
Use the **Quick Version** for fast results, or **Full Version** for detailed analysis.

### Step 4: Get Results
The AI will:
1. Read your Figma data
2. Read your implementation
3. Compare and find differences
4. Give you a report with fixes

---

## 🎁 What You'll Get

✅ List of all discrepancies  
✅ Figma value vs Your value comparison  
✅ Severity levels (Critical/High/Medium/Low)  
✅ Specific code fixes  
✅ Summary statistics  

---

## 📄 Also Saved To File

This prompt is saved at:
**`/Users/n0sfer/_dev/AitiGuruTestingJob/PROMPT_FOR_DISCREPANCY_CHECK.md`**

You can open it anytime:
```bash
cat /Users/n0sfer/_dev/AitiGuruTestingJob/PROMPT_FOR_DISCREPANCY_CHECK.md
```

---

**Just copy the prompt above and paste it into your AI chat!** 🚀
