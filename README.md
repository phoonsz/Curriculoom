# Curriculoom

Resume generator with inline editing, multiple layouts, and automatic saving. Developed in pure HTML, CSS, and JavaScript, with local storage in the browser.

**🌍 Language:** **English** | [Português](./README.pt-BR.md)

---

• **Direct editing** - Click any text and change it on the spot. Empty fields show hints of what to fill in.

• **Layout presets** - Choose from ready-made templates (currently Classic, with more on the way). Each preset keeps its own saved content.

• **Automatic saving** - All changes are stored in your browser. Close and reopen the page and your resume is still there.

• **PDF export** - Generate a PDF with the exact formatting of what you see on screen, perfect for printing or sending.

• **Visual customization** - Adjust colors (accent, background, text) and font through a simple panel. Preferences are also saved.

• **Responsive** - Works well on phones, tablets, and desktops, without compromising the resume layout.

---

## Technologies used

• HTML5, CSS3, and JavaScript (vanilla)

• Local storage (localStorage / storage API) to save data

• CSS Grid and Flexbox for structure and responsiveness

• Print CSS for clean PDF export

---

## Project structure
```
curriculoom/
├── index.html          # Main page (HTML structure)
├── styles.css          # Styles and responsiveness
├── script.js           # Editing logic, presets, and saving
├── LICENSE.md          # Licensing terms
└── README.md           # Project documentation
```

---

## How to use

1. Open the `index.html` file in any modern browser.

2. If JavaScript is broken (no resume layout appears on screen), you can change the JS import code in index.html to <script src="script.js"></script> or you can host the HTML on a local server with 'python -m http.server' in the terminal.

4. On the start screen, choose a resume template (currently only Classic).
   
5. Click on any text to edit it directly.

6. Use the **“+”** buttons to add new items (contacts, skills, experiences, etc.) and **“×”** to remove.

7. Customize colors and font in the **“Colors and font”** button of the toolbar.

8. Click **“Download PDF”** to export your resume.

9. All changes are saved automatically. When you reopen the page, your work will be there.

---

## Screenshots

_(coming soon)_

---

## License

This project can be used, modified, and redistributed freely. However, neither this software nor modified versions can be sold or redistributed commercially without explicit authorization from the copyright holder.

See the [LICENSE](./LICENSE.md) file for the full terms of the license.

---

## Author

Made with 💙 by [phoonsz](https://github.com/phoonsz) – questions, suggestions, or contributions are always welcome!

![phoon2much4zblock](https://github.com/user-attachments/assets/85edc0c6-c746-47c7-a690-8ac0614eae10)