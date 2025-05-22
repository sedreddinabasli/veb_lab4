const melumatlar = {
  "PROFILE": [
    "I have a deep interest in the field of information security. I am specializing in systems protection and security risk management."
  ],
  "WORK EXPERIENCE": [
    "CyberTech MMC (2024 - PRESENT) - Security Analyst: Threat Detection and Monitoring, Incident Response, Vulnerability Assessment, Risk Assessment and Management, Data Protection and Privacy.",
    "SyberSec MMC (2023 - 2024) - Marketing Manager & Specialist: Develop and maintain strong relationships with partners and agencies. Monitor and maintain brand consistency across all marketing materials."
  ],
  "REFERENCE": [
    "Ali Aliyev - AzTU / CTO",
    "Vali Valiyev - AzTU / CEO"
  ]
};

let savedData = [];

window.onload = function() {
  loadData();
  setupForm();
  setupSections();
};

function setupForm() {
  const form = document.getElementById('myForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const desc = document.getElementById('description').value.trim();
    
    let valid = true;
    
    if (name === '') {
      showError('nameError', 'Ad boşdur');
      document.getElementById('name').classList.add('error-input');
      valid = false;
    }
    
    if (email === '') {
      showError('emailError', 'E-poçt boşdur');
      document.getElementById('email').classList.add('error-input');
      valid = false;
    } else if (!email.includes('@')) {
      showError('emailError', 'E-poçt yanlışdır');
      document.getElementById('email').classList.add('error-input');
      valid = false;
    }
    
    if (desc === '') {
      showError('descError', 'Təsvir boşdur');
      document.getElementById('description').classList.add('error-input');
      valid = false;
    }
    
    if (valid) {
      addNewData(name, email, desc);
      form.reset();
      alert('Məlumat əlavə edildi');
    }
  });
  
  document.getElementById('saveBtn').onclick = function() {
    saveData();
    alert('Məlumatlar saxlanıldı');
  };
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('descError').textContent = '';
  
  document.getElementById('name').classList.remove('error-input');
  document.getElementById('email').classList.remove('error-input');
  document.getElementById('description').classList.remove('error-input');
}

function addNewData(name, email, desc) {
  const newItem = {
    name: name,
    email: email,
    description: desc,
    date: new Date().toLocaleDateString()
  };
  
  savedData.push(newItem);
  showAllData();
}

function showAllData() {
  const itemsDiv = document.getElementById('items');
  const dataListDiv = document.getElementById('dataList');
  
  if (savedData.length === 0) {
    dataListDiv.style.display = 'none';
    return;
  }
  
  itemsDiv.innerHTML = '';
  
  for (let i = 0; i < savedData.length; i++) {
    const item = savedData[i];
    const div = document.createElement('div');
    div.className = 'data-item';
    div.innerHTML = `
      <strong>Ad:</strong> ${item.name}<br>
      <strong>E-poçt:</strong> ${item.email}<br>
      <strong>Təsvir:</strong> ${item.description}<br>
      <strong>Tarix:</strong> ${item.date}
    `;
    itemsDiv.appendChild(div);
  }
  
  dataListDiv.style.display = 'block';
}

function saveData() {
  window.mySavedData = savedData;
}

function loadData() {
  if (window.mySavedData) {
    savedData = window.mySavedData;
    showAllData();
  }
}

function setupSections() {
  const bolmeler = document.getElementsByClassName("bolme");
  
  for (let i = 0; i < bolmeler.length; i++) {
    const bolme = bolmeler[i];
    const h2 = bolme.getElementsByTagName("h2")[0];
    const basliq = h2.textContent;
    const content = bolme.getElementsByClassName("content")[0];
    
    if (!content.classList.contains("icerik")) {
      content.classList.add("icerik");
    }
    
    if (melumatlar[basliq]) {
      const ul = document.createElement("ul");
      for (let j = 0; j < melumatlar[basliq].length; j++) {
        const li = document.createElement("li");
        li.textContent = melumatlar[basliq][j];
        
        li.onclick = function() {
          const yeni = prompt("Məlumatı dəyiş:", li.textContent);
          if (yeni) li.textContent = yeni;
        };
        ul.appendChild(li);
      }
      
      const input = content.querySelector("input");
      content.insertBefore(ul, input);
    }
    
    h2.onclick = function() {
      if (content.style.display === "none") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    };
    
    const btn = content.querySelector(".addData");
    const input = content.querySelector("input");
    
    if (btn && input) {
      btn.onclick = function() {
        const melumat = input.value.trim();
        if (melumat === "") {
          alert("Bu sahə boşdur");
          return;
        }
        
        let ul = content.getElementsByTagName("ul")[0];
        if (!ul) {
          ul = document.createElement("ul");
          content.insertBefore(ul, input);
        }
        const li = document.createElement("li");
        li.textContent = melumat;
        
        li.onclick = function() {
          const yeni = prompt("Məlumatı dəyiş:", li.textContent);
          if (yeni) li.textContent = yeni;
        };
        ul.appendChild(li);
        input.value = "";
        
        if (!melumatlar[basliq]) {
          melumatlar[basliq] = [];
        }
        melumatlar[basliq].push(melumat);
      };
    }
  }
}
