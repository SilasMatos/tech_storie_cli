function readFromStorageOrCookie(key, defaultVal) {
  const localVal = localStorage.getItem(key)
  if (localVal) return localVal
  const cookieMatch = document.cookie.match(
    new RegExp('(^| )' + key + '=([^;]+)')
  )
  if (cookieMatch) {
    return decodeURIComponent(cookieMatch[2])
  }
  return defaultVal
}

class MultiStepFeedback extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.state = {
      isFormOpen: false,
      currentStep: 1,
      stepData: {
        contato: '',
        motivo: '',
        detalhamento: '',
        anexo: null
      },
      isSendingFeedback: false,
      customAlert: {
        message: '',
        type: '',
        visible: false
      }
    }
    this.token = readFromStorageOrCookie('accessToken', '')
    let payloadObj = {}
    const parts = this.token.split('.')
    if (parts.length === 3) {
      try {
        payloadObj = JSON.parse(atob(parts[1]))
      } catch (e) {
        console.error('Erro ao decodificar token', e)
      }
    }
    this.staticData = {
      tipo_sistema: 'SISTEMA',
      valor_sistema: 'Efetivometro',
      nome: payloadObj.dados ? payloadObj.dados.NOME : '',
      matricula: payloadObj.dados ? payloadObj.dados.MATRICULA : '',
      login: payloadObj.dados ? payloadObj.dados.LOGIN : ''
    }
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  showCustomAlert(message, type = 'success') {
    this.state.customAlert = {
      message,
      type,
      visible: true
    }
    this.render()
    setTimeout(() => {
      this.hideCustomAlert()
    }, 3000)
  }

  hideCustomAlert() {
    this.state.customAlert.visible = false
    this.render()
  }

  toggleForm() {
    this.state.isFormOpen = !this.state.isFormOpen
    if (!this.state.isFormOpen) {
      this.resetForm()
    }
    this.render()
  }

  nextStep() {
    const { currentStep, stepData } = this.state
    if (currentStep === 1 && !stepData.contato) {
      this.showCustomAlert('Por favor, preencha o contato.', 'error')
      return
    }
    if (currentStep === 2 && !stepData.motivo) {
      this.showCustomAlert('Por favor, preencha o motivo.', 'error')
      return
    }
    if (currentStep === 3 && !stepData.detalhamento) {
      this.showCustomAlert('Por favor, preencha o detalhamento.', 'error')
      return
    }
    if (currentStep < 4) {
      this.state.currentStep++
      this.render()
    }
  }

  prevStep() {
    if (this.state.currentStep > 1) {
      this.state.currentStep--
      this.render()
    }
  }

  updateStepData(field, value) {
    this.state.stepData[field] = value
  }

  async handleFeedbackSubmit() {
    this.state.isSendingFeedback = true
    this.render()
    try {
      const formData = new FormData()
      formData.append('contato', this.state.stepData.contato)
      formData.append('motivo', this.state.stepData.motivo)
      formData.append('detalhamento', this.state.stepData.detalhamento)
      if (this.state.stepData.anexo) {
        formData.append('anexo', this.state.stepData.anexo)
      }
      formData.append('tipo_chamado', this.staticData.tipo_sistema)
      formData.append('nome_sistema', this.staticData.valor_sistema)
      formData.append('quem_abriu', this.staticData.nome)
      formData.append('matricula', this.staticData.matricula)
      formData.append('login_quem_abriu', this.staticData.login)
      const response = await fetch(
        'http://10.71.201.251/apps/suporte_mis_v2/api/chamado/abrir',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjcyMjc5MzI2OTMsImlhdCI6MTczNzAyOTI0NCwiTk9NRSI6IlRFU1RFIiwiQVVUT19BUEVMSURPX0dFU1RPUkVTIjoiVEVTVEUiLCJGVU5DQU8iOiJURVNURSIsIlNVUEVSVklTT1IiOiJURVNURSIsIkNPT1JERU5BRE9SIjoiVEVTVEUiLCJTRVJWSUNPIjoiVEVTVEUiLCJNQVRSSUNVTEEiOiJURVNURSIsIkxPR0lOIjoiVEVTVEUifQ.KwXtq094M1aFBuIlM5u0wl3DkanUhm_F9wq7NNxMB8o`
          }
        }
      )
      if (!response.ok) {
        throw new Error('Erro ao enviar o chamado!')
      }
      this.showCustomAlert('Chamado aberto com sucesso!', 'success')
    } catch (error) {
      this.showCustomAlert(
        'Ocorreu um erro ao abrir o chamado: ' + error.message,
        'error'
      )
      console.error(error)
    } finally {
      this.state.isSendingFeedback = false
      this.resetForm()
      this.toggleForm()
    }
  }

  resetForm() {
    this.state.currentStep = 1
    this.state.stepData = {
      contato: '',
      motivo: '',
      detalhamento: '',
      anexo: null
    }
    this.state.isSendingFeedback = false
  }

  renderStep() {
    const { currentStep, stepData } = this.state
    switch (currentStep) {
      case 1:
        return `
          <label class="label_style" for="contato">Contato (telefone ou email) *</label>
          <input
            id="contato"
            type="text"
            value="${stepData.contato}"
            oninput="this.getRootNode().host.updateStepData('contato', this.value)"
            placeholder="Informe seu contato"
          />
        `
      case 2:
        return `
          <label class="label_style" for="motivo">Motivo *</label>
          <input
            id="motivo"
            type="text"
            value="${stepData.motivo}"
            oninput="this.getRootNode().host.updateStepData('motivo', this.value)"
            placeholder="Ex: Reportar bug, Solicitar funcionalidade..."
          />
        `
      case 3:
        return `
          <label class="label_style" for="detalhamento">Detalhamento *</label>
          <textarea
            id="detalhamento"
            oninput="this.getRootNode().host.updateStepData('detalhamento', this.value)"
            placeholder="Descreva o que está acontecendo ou o que deseja..."
            style="resize: vertical;"
          >${stepData.detalhamento}</textarea>
        `
      case 4:
        return `
          <label class="label_style" for="anexo">Anexo (opcional)</label>
          <input
            id="anexo"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
            onchange="this.getRootNode().host.updateStepData('anexo', this.files[0])"
          />
        `
      default:
        return ''
    }
  }

  renderAlert() {
    const { message, type, visible } = this.state.customAlert
    if (!visible) return ''
    const bgColor = type === 'error' ? '#dc3545' : '#28a745'
    return `
      <div class="alert-box" style="background-color:${bgColor}">
        <span>${message}</span>
        <button class="alert-close" onclick="this.getRootNode().host.hideCustomAlert()">×</button>
      </div>
    `
  }

  render() {
    const { isFormOpen, currentStep, isSendingFeedback } = this.state
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          font-family: sans-serif;
        }
        .label_style {
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          color: #545454;
          margin-bottom: 4px;
        }
        .widget {
          position: fixed;
          bottom: 16px;
          right: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          z-index: 999999;
        }
        .toggle-button-container {
          position: relative;
          display: inline-block;
        }
        .tooltip-text {
          visibility: hidden;
          width: max-content;
          max-width: 200px;
          background-color: #0434EC ;
          color: #fff;
          text-align: center;
          border-radius: 4px;
          padding: 4px 8px;
          position: absolute;
          z-index: 9999;
          bottom: 110%;
          left: 15%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.2s;
          font-size: 12px;
        }
        .toggle-button-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }
        .toggle-button {
          background: #007BFF;
          color: white;
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .toggle-button:hover {
          background: #0056b3;
        }
        .form-container {
          background: #fff;
          width: 320px;
          max-width: 90vw;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          margin-bottom: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .form-container h2 {
          margin: 0;
          font-size: 18px;
          color: #007BFF;
        }
        label {
          font-size: 14px;
          margin-bottom: 4px;
          display: block;
          font-weight: bold;
          color: #333;
        }
        input[type="text"],
        input[type="file"],
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        input[type="text"]:focus,
        input[type="file"]:focus,
        textarea:focus {
          border-color: #007BFF;
          outline: none;
        }
        textarea {
          min-height: 80px;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .step-info {
          font-size: 12px;
          color: #666;
        }
        button {
          cursor: pointer;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          transition: background 0.2s;
        }
        .prev-button {
          background: #6c757d;
          color: #fff;
        }
        .prev-button:hover {
          background: #5a6268;
        }
        .next-button,
        .send-button {
          background: #007BFF;
          color: #fff;
        }
        .next-button:hover,
        .send-button:hover {
          background: #0056b3;
        }
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          vertical-align: middle;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .alert-container {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 100000;
        }
        .alert-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 4px;
          color: #fff;
          margin-bottom: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          font-size: 14px;
          animation: fade-in 0.3s ease-out;
          max-width: 300px;
        }
        .alert-close {
          background: transparent;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="alert-container">
        ${this.renderAlert()}
      </div>
      <div class="widget">
        ${
          isFormOpen
            ? `
              <div class="form-container">
                <h2>Abrir Chamado</h2>
                <div class="step-info">Etapa ${currentStep} de 4</div>
                ${this.renderStep()}
                <div class="buttons">
                  ${
                    currentStep > 1
                      ? `<button class="prev-button" onclick="this.getRootNode().host.prevStep()">Voltar</button>`
                      : ''
                  }
                  ${
                    currentStep < 4
                      ? `<button class="next-button" onclick="this.getRootNode().host.nextStep()">Avançar</button>`
                      : `
                        <button class="send-button" onclick="this.getRootNode().host.handleFeedbackSubmit()">
                          ${
                            isSendingFeedback
                              ? '<span class="loading-spinner"></span>'
                              : 'Enviar'
                          }
                        </button>
                      `
                  }
                </div>
              </div>
            `
            : ''
        }
        <div class="toggle-button-container">
          <button class="toggle-button" onclick="this.getRootNode().host.toggleForm()">
            ${
              isFormOpen
                ? '×'
                : `
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z"></path></svg>
                `
            }
          </button>
          <div class="tooltip-text">Suporte MIS</div>
        </div>
      </div>
    `
  }
}

customElements.define('multi-step-feedback', MultiStepFeedback)
