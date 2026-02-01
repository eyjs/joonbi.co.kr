export interface PaymentRequestData {
  clientName: string;
  projectName: string;
  paymentType: string;
  amount: string;
  dueDate: string;
  paymentMethod?: string;
  accountInfo?: string;
}

export const paymentRequestTemplate = (data: PaymentRequestData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }
    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px 0;
    }
    .info-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-label {
      font-weight: 600;
      color: #666;
      width: 140px;
    }
    .info-value {
      color: #333;
      flex: 1;
    }
    .amount-box {
      background-color: #f0f9ff;
      border: 2px solid #2563eb;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
    }
    .amount-box .label {
      color: #666;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .amount-box .amount {
      color: #2563eb;
      font-size: 32px;
      font-weight: bold;
    }
    .account-info {
      background-color: #f8fafc;
      border-left: 4px solid #10b981;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
      color: #666;
      font-size: 14px;
    }
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px;
      margin: 15px 0;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>결제 요청 안내</h1>
      <p>안녕하세요, ${data.clientName}님</p>
    </div>

    <div class="content">
      <p>프로젝트 진행에 따른 결제를 요청드립니다.</p>

      <div class="info-row">
        <div class="info-label">프로젝트명</div>
        <div class="info-value">${data.projectName}</div>
      </div>

      <div class="info-row">
        <div class="info-label">결제 구분</div>
        <div class="info-value">${data.paymentType}</div>
      </div>

      <div class="info-row">
        <div class="info-label">결제 기한</div>
        <div class="info-value">${data.dueDate}</div>
      </div>

      <div class="amount-box">
        <div class="label">결제 금액</div>
        <div class="amount">${data.amount}</div>
      </div>

      ${data.accountInfo ? `
      <div class="account-info">
        <h3 style="margin-top: 0; color: #10b981;">계좌 정보</h3>
        <p style="margin-bottom: 0; white-space: pre-line; font-family: monospace;">${data.accountInfo}</p>
      </div>
      ` : ''}

      ${data.paymentMethod ? `
      <div class="info-row">
        <div class="info-label">결제 방법</div>
        <div class="info-value">${data.paymentMethod}</div>
      </div>
      ` : ''}

      <div class="warning">
        <strong>유의사항:</strong> 결제 기한 내에 입금 부탁드립니다. 입금 후 입금자명을 회신해주시면 확인 후 영수증을 발급해드리겠습니다.
      </div>

      <p style="margin-top: 20px;">
        결제 관련 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
      </p>
    </div>

    <div class="footer">
      <p>이 메일은 발신 전용입니다.</p>
      <p>Joonbi Studio</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};
