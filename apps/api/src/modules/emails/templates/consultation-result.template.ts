export interface ConsultationResultData {
  clientName: string;
  projectType: string;
  estimatedBudget: string;
  estimatedDuration: string;
  consultantNotes?: string;
  consultationDate: string;
}

export const consultationResultTemplate = (data: ConsultationResultData): string => {
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
    .notes {
      background-color: #f8fafc;
      border-left: 4px solid #2563eb;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>상담 결과 안내</h1>
      <p>안녕하세요, ${data.clientName}님</p>
    </div>

    <div class="content">
      <p>프로젝트 상담이 완료되었습니다. 상담 결과를 안내드립니다.</p>

      <div class="info-row">
        <div class="info-label">프로젝트 유형</div>
        <div class="info-value">${data.projectType}</div>
      </div>

      <div class="info-row">
        <div class="info-label">예상 예산</div>
        <div class="info-value">${data.estimatedBudget}</div>
      </div>

      <div class="info-row">
        <div class="info-label">예상 기간</div>
        <div class="info-value">${data.estimatedDuration}</div>
      </div>

      <div class="info-row">
        <div class="info-label">상담일</div>
        <div class="info-value">${data.consultationDate}</div>
      </div>

      ${data.consultantNotes ? `
      <div class="notes">
        <h3 style="margin-top: 0; color: #2563eb;">상담 메모</h3>
        <p style="margin-bottom: 0; white-space: pre-line;">${data.consultantNotes}</p>
      </div>
      ` : ''}

      <p style="margin-top: 20px;">
        추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
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
