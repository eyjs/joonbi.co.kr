export interface ProjectCompletedData {
  clientName: string;
  projectName: string;
  startDate: string;
  endDate: string;
  totalDuration: string;
  deliverables: string[];
  projectUrl?: string;
  feedbackUrl?: string;
}

export const projectCompletedTemplate = (data: ProjectCompletedData): string => {
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
      color: #10b981;
      margin: 0;
      font-size: 24px;
    }
    .celebration {
      text-align: center;
      font-size: 64px;
      margin: 20px 0;
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
    .success-box {
      background-color: #f0fdf4;
      border: 2px solid #10b981;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .success-box h2 {
      color: #10b981;
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .success-box p {
      color: #666;
      margin: 0;
    }
    .deliverables {
      background-color: #f8fafc;
      border-left: 4px solid #10b981;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .deliverables ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .deliverables li {
      padding: 5px 0;
    }
    .button {
      display: inline-block;
      background-color: #10b981;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 10px 5px;
    }
    .button.secondary {
      background-color: #2563eb;
    }
    .button:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
      color: #666;
      font-size: 14px;
    }
    .thank-you {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="celebration">🎉</div>
      <h1>프로젝트 완료 안내</h1>
      <p>축하드립니다, ${data.clientName}님!</p>
    </div>

    <div class="content">
      <div class="success-box">
        <h2>${data.projectName}</h2>
        <p>프로젝트가 성공적으로 완료되었습니다</p>
      </div>

      <div class="info-row">
        <div class="info-label">시작일</div>
        <div class="info-value">${data.startDate}</div>
      </div>

      <div class="info-row">
        <div class="info-label">완료일</div>
        <div class="info-value">${data.endDate}</div>
      </div>

      <div class="info-row">
        <div class="info-label">총 소요기간</div>
        <div class="info-value">${data.totalDuration}</div>
      </div>

      ${data.deliverables && data.deliverables.length > 0 ? `
      <div class="deliverables">
        <h3 style="margin-top: 0; color: #10b981;">최종 산출물</h3>
        <ul>
          ${data.deliverables.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div class="thank-you">
        <h3 style="margin-top: 0; color: #f59e0b;">감사의 말씀</h3>
        <p>
          프로젝트 기간 동안 보내주신 신뢰와 협조에 깊이 감사드립니다.
          앞으로도 더 나은 서비스로 보답하겠습니다.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        ${data.projectUrl ? `<a href="${data.projectUrl}" class="button">프로젝트 보기</a>` : ''}
        ${data.feedbackUrl ? `<a href="${data.feedbackUrl}" class="button secondary">피드백 남기기</a>` : ''}
      </div>

      <p style="margin-top: 20px; text-align: center;">
        추가 지원이나 유지보수가 필요하신 경우 언제든지 연락 주시기 바랍니다.
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
