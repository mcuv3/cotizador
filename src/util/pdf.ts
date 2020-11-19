import { QuotationData } from "../models/Quotation/Quotation";

export const _pdf = (data: QuotationData) => {
  const content = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            padding: 2rem;
            width: 800px;
            margin: auto;
          }
    
          .sapacer {
            margin-top: 1rem;
          }
          .box {
            border: 1px solid black;
            padding: 0.5rem;
          }
          .center {
            text-align: center;
          }
    
          .field {
            display: flex;
            justify-content: space-between;
          }
          .filed-left {
            display: flex;
          }
          .center-box {
            margin: 1rem auto;
          }
          .text-small {
            font-size: 0.8rem;
          }
          .left {
            text-align: left;
          }
    
          .space-right {
            padding-right: 2rem;
          }
          .qty {
            margin-right: 2rem;
          }
    
          header {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
          }
        </style>
      </head>
    
      <body>
        <div class="container">
          <header>
            <div>Sistemas Solares Del Pacifico</div>
          </header>
          <div class="box sapacer center">PRESUPUESTO DE PANELES SOLARES</div>
          <div class="box sapacer">
            <div class="field">
              <div>${data.branch || "Morelia"},Michoacan</div>
            </div>
            <div class="field">
              <div class="">Cotización No. ${data.branch?.slice(0, 3)}-${
    data.quotation_id
  }-${data.quotation_number}</div>
            </div>
    
            <div class="field">
              <div class="">Nombre: ${data.name}</div>
            </div>
            <div class="field">Email: ${data.email}</div>
            <div class="field">
              <div>Teléfono: ${data.phone}</div>
            </div>
          </div>
    
          <table class="center-box">
            <tr>
              <th class="box">Cantidad</th>
              <th class="box">Concepto</th>
              <th class="box">Costo Unitario</th>
              <th class="box">Sub Total</th>
            </tr>
    
            <tr>
              <td class="box">1</td>
              <td class="box">Cotización de PANELES</td>
              <td class="box">${data.SUB_TOTAL}</td>
              <td class="box">${data.SUB_TOTAL}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>IVA ${data.IVA}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL ${data.TOTAL}</td>
            </tr>
          </table>

          
    
          <div class="box sapacer">
          ${data.components_info.map((comp) => {
            return `
                <div class="filed-left text-small">
              <label class="qty">${comp.qty} ${comp.description}</label>
            </div>
                `;
          })}
          </div>
        </div>
      </body>
    </html>
    `;

  return content;
};

// <div class="filed-left text-small sapacer">
//               <label class="qty">${data.components_info.find(comp=>comp.kind ===kind.MOUNTING_SYSTEM).}</label>
//               <p>Metros cuadrados requeridos</p>
//             </div>
