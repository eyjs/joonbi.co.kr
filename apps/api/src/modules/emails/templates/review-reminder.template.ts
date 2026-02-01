export interface ReviewReminderData {
  clientName: string;
  projectName: string;
  documentType: string;
  documentVersion: string;
  reviewDeadline: string;
  daysRemaining: number;
  reviewUrl?: string;
}

export const reviewReminderTemplate = (data: ReviewReminderData): string => {
  const urgencyColor = data.daysRemaining <= 2 ? '#dc2626' : data.daysRemaining <= 5 ? '#f59e0b' : '#2563eb';
  const urgencyText = data.daysRemaining <= 2 ? '긴급' : data.daysRemaining <= 5 ? '주의' : '일반';

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
      color: ${urgencyColor};
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
    .deadline-box {
      background-color: ${urgencyColor}10;
      border: 2px solid ${urgencyColor};
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .deadline-box .label {
      color: #666;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .deadline-box .days {
      color: ${urgencyColor};
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }
    .deadline-box .deadline {
      color: #666;
      font-size: 16px;
    }
    .urgency-badge {
      display: inline-block;
      background-color: ${urgencyColor};
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .button {
      display: inline-block;
      background-color: ${urgencyColor};
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 10px 0;
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
    .checklist {
      background-color: #f8fafc;
      border-left: 4px solid ${urgencyColor};
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .checklist ul {
      margin: 10px 0;
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="urgency-badge">[${urgencyText}]</span>
      <h1>검토 마감 리마인더</h1>
      <p>안녕하세요, ${data.clientName}님</p>
    </div>

    <div class="content">
      <p>산출물 검토 마감일이 다가오고 있습니다.</p>

      <div class="deadline-box">
        <div class="label">검토 마감까지</div>
        <div class="days">${data.daysRemaining}일</div>
        <div class="deadline">${data.reviewDeadline}</div>
      </div>

      <div class="info-row">
        <div class="info-label">프로젝트명</div>
        <div class="info-value">${data.projectName}</div>
      </div>

      <div class="info-row">
        <div class="info-label">문서 유형</div>
        <div class="info-value">${data.documentType}</div>
      </div>

      <div class="info-row">
        <div class="info-label">문서 버전</div>
        <div class="info-value">${data.documentVersion}</div>
      </div>

      <div class="checklist">
        <h3 style="margin-top: 0; color: ${urgencyColor};">검토 시 확인사항</h3>
        <ul>
          <li>요구사항이 모두 반영되었는지 확인</li>
          <li>수정이 필요한 부분이 있는지 확인</li>
          <li>추가 요청사항이 있는지 확인</li>
        </ul>
      </div>

      ${data.reviewUrl ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.reviewUrl}" class="button">지금 검토하기</a>
      </div>
      ` : ''}

      <p style="margin-top: 20px; color: ${urgencyColor}; font-weight: 600;">
        마감일 내에 피드백을 주시면 프로젝트 일정에 차질 없이 진행할 수 있습니다.
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
