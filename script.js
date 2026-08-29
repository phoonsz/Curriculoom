/**
 * Curriculoom – Application Entry
 * Uses a single class to manage state, DOM, storage, and event delegation.
 */
class ResumeApp {
  #resumeContainer;
  #presetGrid;
  #stylePanel;
  #storageKey = 'curriculoom';

  constructor() {
    this.#resumeContainer = document.getElementById('resumeContainer');
    this.#presetGrid = document.getElementById('presetGrid');
    this.#stylePanel = document.getElementById('stylePanel');

    this.currentPreset = null;
    this.saveTimer = null;

    this.#bindEvents();
    this.#loadStyles();
    this.#renderPresets();
    this.#loadSelectedPreset();
  }

  // ---------- EVENT BINDING (delegation) ----------
  #bindEvents() {
    // Global click delegation for data-action
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      if (typeof this[action] === 'function') {
        e.preventDefault();
        this[action](btn);
      }
    });

    // Style panel color inputs
    document.querySelectorAll('[data-style]').forEach((el) => {
      el.addEventListener('input', () => this.#applyStyles());
    });

    // Auto-save on any content change inside the resume
    this.#resumeContainer.addEventListener('input', () => this.#scheduleSave());
    this.#resumeContainer.addEventListener('click', () => this.#scheduleSave());

    // Mirror first/last name between sidebar and header
    this.#resumeContainer.addEventListener('input', (e) => {
      const target = e.target.closest('[data-field]');
      if (!target) return;
      const field = target.dataset.field;
      const siblings = this.#resumeContainer.querySelectorAll(`[data-field="${field}"]`);
      siblings.forEach((el) => {
        if (el !== target) el.textContent = target.textContent;
      });
      this.#scheduleSave();
    });
  }

  // ---------- PRESETS ----------
  #getPresets() {
    return {
      classic: {
        id: 'classic',
        name: 'Clássico',
        desc: 'Layout tradicional com duas colunas, ideal para todas as áreas.',
        thumbnail: `<svg viewBox="0 0 120 80" width="120" height="80" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="80" fill="#f0f0f0"/>
          <rect x="0" y="0" width="38" height="80" fill="#1E3A5F"/>
          <rect x="6" y="10" width="26" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="18" width="20" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="26" width="24" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="36" width="18" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="44" width="22" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="54" width="16" height="3" rx="1" fill="#93C5FD"/>
          <rect x="6" y="64" width="20" height="3" rx="1" fill="#93C5FD"/>
          <rect x="42" y="8" width="30" height="6" rx="2" fill="#ccc"/>
          <rect x="42" y="18" width="50" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="26" width="40" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="34" width="60" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="44" width="55" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="52" width="45" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="62" width="50" height="4" rx="2" fill="#ddd"/>
          <rect x="42" y="70" width="35" height="4" rx="2" fill="#ddd"/>
        </svg>`,
        templateId: 'tmpl-resume-classic',
      },
    };
  }

  #renderPresets() {
    const presets = this.#getPresets();
    const tmpl = document.getElementById('tmpl-preset-card');
    this.#presetGrid.innerHTML = '';

    Object.values(presets).forEach((p) => {
      const card = tmpl.content.cloneNode(true).firstElementChild;
      card.dataset.presetId = p.id;
      card.querySelector('.thumbnail').innerHTML = p.thumbnail;
      card.querySelector('h3').textContent = p.name;
      card.querySelector('.desc').textContent = p.desc;
      card.addEventListener('click', () => this.#selectPreset(p.id));
      this.#presetGrid.appendChild(card);
    });
  }

  #selectPreset(id) {
    const presets = this.#getPresets();
    const preset = presets[id];
    if (!preset) return;

    this.currentPreset = id;
    document.getElementById('presetOverlay').setAttribute('hidden', '');

    const tmpl = document.getElementById(preset.templateId);
    const clone = tmpl.content.cloneNode(true);
    this.#resumeContainer.innerHTML = '';
    this.#resumeContainer.appendChild(clone);

    // Disable spellcheck on all contenteditable
    this.#resumeContainer.querySelectorAll('[contenteditable]').forEach((el) => {
      el.setAttribute('spellcheck', 'false');
    });

    // Load saved content for this preset
    this.#loadSavedContent(id);

    // Save selection
    localStorage.setItem(`${this.#storageKey}:preset`, id);
  }

  // ---------- STORAGE (sync) ----------
  #saveContent() {
    if (!this.currentPreset) return;
    const html = this.#resumeContainer.innerHTML;
    localStorage.setItem(`${this.#storageKey}:${this.currentPreset}`, html);
  }

  #loadSavedContent(id) {
    const saved = localStorage.getItem(`${this.#storageKey}:${id}`);
    if (saved) {
      this.#resumeContainer.innerHTML = saved;
      // Re-apply spellcheck false
      this.#resumeContainer.querySelectorAll('[contenteditable]').forEach((el) => {
        el.setAttribute('spellcheck', 'false');
      });
    }
  }

  #loadSelectedPreset() {
    const saved = localStorage.getItem(`${this.#storageKey}:preset`);
    if (saved && this.#getPresets()[saved]) {
      this.#selectPreset(saved);
    } else {
      document.getElementById('presetOverlay').removeAttribute('hidden');
    }
  }

  #scheduleSave() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.#saveContent(), 500);
  }

  // ---------- STYLE PERSISTENCE ----------
  #applyStyles() {
    const accent = document.getElementById('colorAccent').value;
    const sidebar = document.getElementById('colorSidebar').value;
    const ink = document.getElementById('colorInk').value;
    const body = document.getElementById('colorBody').value;
    const font = document.getElementById('fontSelect').value;

    const root = document.documentElement.style;
    root.setProperty('--blue', accent);
    root.setProperty('--blue-soft', this.#lighten(accent, 0.55));
    root.setProperty('--navy', sidebar);
    root.setProperty('--navy-light', this.#lighten(sidebar, 0.18));
    root.setProperty('--ink', ink);
    root.setProperty('--text-body', body);
    root.setProperty('--font-family', font);

    this.#saveStyles();
  }

  #lighten(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r0 = (num >> 16) & 0xff,
      g0 = (num >> 8) & 0xff,
      b0 = num & 0xff;
    const r = Math.min(255, Math.round(r0 + (255 - r0) * percent));
    const g = Math.min(255, Math.round(g0 + (255 - g0) * percent));
    const b = Math.min(255, Math.round(b0 + (255 - b0) * percent));
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  }

  #saveStyles() {
    const data = {
      accent: document.getElementById('colorAccent').value,
      sidebar: document.getElementById('colorSidebar').value,
      ink: document.getElementById('colorInk').value,
      body: document.getElementById('colorBody').value,
      font: document.getElementById('fontSelect').value,
    };
    localStorage.setItem(`${this.#storageKey}:styles`, JSON.stringify(data));
  }

  #loadStyles() {
    const raw = localStorage.getItem(`${this.#storageKey}:styles`);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.accent) document.getElementById('colorAccent').value = data.accent;
      if (data.sidebar) document.getElementById('colorSidebar').value = data.sidebar;
      if (data.ink) document.getElementById('colorInk').value = data.ink;
      if (data.body) document.getElementById('colorBody').value = data.body;
      if (data.font) document.getElementById('fontSelect').value = data.font;
      this.#applyStyles();
    } catch (_) {
      /* ignore */
    }
  }

  // ---------- ACTION HANDLERS (called via data-action) ----------
  toggleStylePanel() {
    this.#stylePanel.toggleAttribute('hidden');
  }

  resetStyle() {
    document.getElementById('colorAccent').value = '#3B82F6';
    document.getElementById('colorSidebar').value = '#1E3A5F';
    document.getElementById('colorInk').value = '#0F172A';
    document.getElementById('colorBody').value = '#334155';
    document.getElementById('fontSelect').selectedIndex = 0;
    this.#applyStyles();
  }

  resetResume() {
    if (confirm('Isso vai apagar todo o conteúdo atual e voltar para a seleção de modelos. Continuar?')) {
      if (this.currentPreset) {
        localStorage.removeItem(`${this.#storageKey}:${this.currentPreset}`);
      }
      this.#resumeContainer.innerHTML = '';
      this.currentPreset = null;
      document.getElementById('presetOverlay').removeAttribute('hidden');
    }
  }

  printPdf() {
    window.print();
  }

  // ----- Dynamic Adders -----
  addContact() {
    const list = this.#findList('contacts');
    if (!list) return;
    const tmpl = document.getElementById('tmpl-contact-row');
    const row = tmpl.content.cloneNode(true);
    list.appendChild(row);
    this.#focusEditable(row);
    this.#scheduleSave();
  }

  addLanguage() {
    const list = this.#findList('languages');
    if (!list) return;
    const tmpl = document.getElementById('tmpl-lang-row');
    const row = tmpl.content.cloneNode(true);
    list.appendChild(row);
    this.#focusEditable(row);
    this.#scheduleSave();
  }

  addTag(btn) {
    const listId = btn.dataset.list;
    const list = document.querySelector(`[data-list="${listId}"]`);
    if (!list) return;
    const tmpl = document.getElementById('tmpl-tag-chip');
    const chip = tmpl.content.cloneNode(true);
    list.appendChild(chip);
    this.#focusEditable(chip);
    this.#scheduleSave();
  }

  addRoleTag() {
    const list = document.querySelector('[data-list="roleTags"]');
    if (!list) return;
    const tmpl = document.getElementById('tmpl-role-tag');
    const chip = tmpl.content.cloneNode(true);
    list.appendChild(chip);
    this.#focusEditable(chip);
    this.#scheduleSave();
  }

  addBullet(btn) {
    const entry = btn.closest('.entry');
    const list = entry?.querySelector('[data-list="bullets"]');
    if (!list) return;
    const tmpl = document.getElementById('tmpl-bullet');
    const item = tmpl.content.cloneNode(true);
    list.appendChild(item);
    this.#focusEditable(item);
    this.#scheduleSave();
  }

  addSubline(btn) {
    const entry = btn.closest('.entry');
    const list = entry?.querySelector('[data-list="sublines"]');
    if (!list) return;
    const tmpl = document.getElementById('tmpl-subline');
    const item = tmpl.content.cloneNode(true);
    list.appendChild(item);
    this.#focusEditable(item);
    this.#scheduleSave();
  }

  addExperience() {
    const list = document.querySelector('[data-list="experiences"]');
    if (!list) return this.#addEntryToList(list);
  }

  addEducation() {
    const list = document.querySelector('[data-list="educations"]');
    if (!list) return this.#addEntryToList(list);
  }

  #addEntryToList(list) {
    const tmpl = document.getElementById('tmpl-entry');
    const entry = tmpl.content.cloneNode(true);
    list.appendChild(entry);
    this.#focusEditable(entry);
    this.#scheduleSave();
  }

  addCustomSection() {
    const main = this.#resumeContainer.querySelector('.main');
    const insertBefore = main?.querySelector('.main > .add-link:last-of-type');
    if (!main || !insertBefore) return;

    const section = document.createElement('section');
    section.className = 'section';
    const uid = `custom-${Date.now()}`;
    section.innerHTML = `
      <button class="x-btn section-del" data-action="removeSection" aria-label="Remover seção">×</button>
      <div class="section-title"><span class="section-title-text" contenteditable="true">Nova Seção</span><span class="section-title-bar"></span></div>
      <div class="list-container" data-list="${uid}"></div>
      <button class="add-link" data-action="addEntryToCustom" data-list="${uid}">+ item</button>
    `;
    main.insertBefore(section, insertBefore);

    // Add first entry
    const list = section.querySelector(`[data-list="${uid}"]`);
    if (list) this.#addEntryToList(list);
    this.#scheduleSave();
  }

  addEntryToCustom(btn) {
    const listId = btn.dataset.list;
    const list = document.querySelector(`[data-list="${listId}"]`);
    if (list) this.#addEntryToList(list);
  }

  removeSection(btn) {
    const section = btn.closest('.section');
    if (section) {
      section.remove();
      this.#scheduleSave();
    }
  }

  removeRow(btn) {
    const row = btn.closest('[data-component]');
    if (row) {
      row.remove();
      this.#scheduleSave();
    }
  }

  removeEntry(btn) {
    const wrap = btn.closest('.entry-wrap');
    if (wrap) {
      wrap.remove();
      this.#scheduleSave();
    }
  }

  setLangBar(input) {
    const fill = input.closest('.lang-row').querySelector('.lang-bar-fill');
    if (fill) fill.style.width = input.value + '%';
    this.#scheduleSave();
  }

  // ----- Helpers -----
  #findList(name) {
    return this.#resumeContainer.querySelector(`[data-list="${name}"]`);
  }

  #focusEditable(container) {
    const editable = container.querySelector('[contenteditable]');
    if (editable) {
      editable.focus();
      const range = document.createRange();
      range.selectNodeContents(editable);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

// Boot the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ResumeApp();
});