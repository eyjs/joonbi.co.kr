export interface DocumentReadyData {
  clientName: string;
  projectName: string;
  documentType: string;
  documentVersion: string;
  uploadDate: string;
  downloadUrl?: string;
  description?: string;
}

export const documentReadyTemplate = (data: DocumentReadyData): string => {
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
    .document-box {
      background-color: #f0f9ff;
      border: 2px solid #2563eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .document-box .icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
    .document-box .type {
      color: #2563eb;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .document-box .version {
      color: #666;
      font-size: 14px;
    }
    .description {
      background-color: #f8fafc;
      border-left: 4px solid #2563eb;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 10px 0;
    }
    .button:hover {
      background-color: #1d4ed8;
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
      <h1>산출물 준비 완료</h1>
      <p>안녕하세요, ${data.clientName}님</p>
    </div>

    <div class="content">
      <p>요청하신 산출물이 준비되었습니다.</p>

      <div class="document-box">
        <div class="icon">📄</div>
        <div class="type">${data.documentType}</div>
        <div class="version">버전: ${data.documentVersion}</div>
      </div>

      <div class="info-row">
        <div class="info-label">프로젝트명</div>
        <div class="info-value">${data.projectName}</div>
      </div>

      <div class="info-row">
        <div class="info-label">업로드일</div>
        <div class="info-value">${data.uploadDate}</div>
      </div>

      ${data.description ? `
      <div class="description">
        <h3 style="margin-top: 0; color: #2563eb;">산출물 설명</h3>
        <p style="margin-bottom: 0; white-space: pre-line;">${data.description}</p>
      </div>
      ` : ''}

      ${data.downloadUrl ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.downloadUrl}" class="button">산출물 다운로드</a>
      </div>
      ` : ''}

      <p style="margin-top: 20px;">
        산출물을 확인하신 후 피드백이 있으시면 회신해 주시기 바랍니다.
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
