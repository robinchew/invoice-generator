function importInvoice({ ramda: R }) {
  const re = /([0-9]+:[0-9]+[ -]+[0-9]+:[0-9]+)/g;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  function tag(tagName) {
    return content => `<${tagName}>` + content + `</${tagName}>`;
  }
  function zeroPrefix(num) {
    if (num <= 9) {
      return `0${num}`;
    }
    return `${num}`;
  }
  function formatDate(date) {
    return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(' ');
  }
  function sum(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
  }
  function replaceLine(line) {
    const segmented = R.flatten(
      R.splitEvery(2, line.split(re)).map(([text, match]) => {
        if (!match) {
          return text;
        }
        const [start, end] = match.replace(' ', '').split('-');

        const [startHours, endHours] = [start, end].map((time) => {
          const [hr, min] = time.split(':').map((v) => parseInt(v, 10));
          return hr + min / 60;
        });
        const duration = endHours >= startHours ? endHours - startHours : endHours + 24 - startHours;
        return [text, { timeRange: match, hours: duration }];
      })
    );
    const dateColumn = segmented[0];
    const timeRange = R.dropLast(1, R.drop(1, segmented))
      .map((item) => (item.timeRange || item))
      .join('');
    const description = R.last(segmented);
    const totalHoursPerRow = sum(segmented.map((item) => item.hours || 0));
    return [dateColumn, timeRange, description, totalHoursPerRow];
  }
  function renderInvoice(text, adjustments = [], invoiceDate, titlePrefix, hourlyWage = 0, taxPercent = 10, invoicePrefix = 'OX',
          client = { company: 'Company Name', email: 'name@email.com', phone: '(08) 0000 0000'},
          business = {name: 'Business Name', bank: 'Bank Name', accountName: 'Account Name', BSB: '000000', accountNumber: '000000', email: 'mail@gmail.com', ABN: "00000000000"}
      ) {
      const rows = text.split('\n').filter((v) => v).map(replaceLine).concat(adjustments);
      const tableRows = rows.map((columns) => {
          const [date, timeRange, description, hours] = columns;
          const lineTotal = (parseFloat(hours) || 0) * hourlyWage;
          return `<tr><td style="white-space:nowrap">${date}</td><td style="white-space:nowrap">${timeRange}</td><td>${description}</td><td>${hours.toFixed(2)}</td><td>$${lineTotal.toFixed(2)}</td></tr>`;
      }).join('\n');

      const totalHours = sum(rows.map((arr) => arr[3]));
      const totalAmount = totalHours * hourlyWage;
      const taxAmount = totalAmount * (taxPercent / 100);
      const grandTotal = totalAmount + taxAmount;

      const invoiceId = invoicePrefix + [
        invoiceDate.getFullYear().toString().substr(-2),
        invoiceDate.getMonth() + 1,
        invoiceDate.getDate(),
      ].map(zeroPrefix).join('');
      const firstDate = rows[0][0];
      const lastDate = R.last(rows)[0];
      const totalRow = `<tr style="font-weight:bold"><td colspan="2"></td><td style="text-align:right;">Total</td><td>${totalHours.toFixed(2)}</td><td>$${totalAmount.toFixed(2)}</td></tr>
                         <tr style="font-weight:bold"><td colspan="3"></td><td>Tax (${taxPercent}%)</td><td>$${taxAmount.toFixed(2)}</td></tr>
                         <tr style="font-weight:bold"><td colspan="3"></td><td>Grand Total</td><td>$${grandTotal.toFixed(2)}</td></tr>`;
      const invoiceTable = '<table><thead><tr><th>Date</th><th>Time</th><th>Description</th><th>Hours</th><th style="white-space:nowrap">$80 x hrs</th></tr></thead><tbody>' + tableRows + totalRow + '</tbody></table>';
      const totalAmountText = `<h1>AMOUNT DUE: $<span style="text-decoration:underline">${grandTotal.toFixed(2)} AUD</span></h1>`;
      const clientDetails = `
      <div class="client-details">
          <h2>Client Details</h2>
          <table>
              <tr>
                  <td>Company</td>
                  <td>${client.company}</td>
              </tr>
              <tr>
                  <td>E-mail</td>
                  <td>${client.email}</td>
              </tr>
              <tr>
                  <td>Phone</td>
                  <td>${client.phone}</td>
              </tr>
          </table>
      </div>`;
      const bankingDetails = `
      <div class="banking-details">
          <h2>Banking Details</h2>
          <table>
              <tr>
                  <td>Bank</td>
                  <td>${business.bank}</td>
              </tr>
              <tr>
                  <td>Account Name</td>
                  <td>${business.accountName}</td>
              </tr>
              <tr>
                  <td>BSB No.</td>
                  <td>${business.BSB}</td>
              </tr>
              <tr>
                  <td>Account Number</td>
                  <td>${business.accountNumber}</td>
              </tr>
              <tr>
                  <td>Reference</td>
                  <td>${invoiceId}</td>
              </tr>
              <!-- Add more rows as needed -->
          </table>
      </div>`;

      const invoiceTitle = taxPercent > 0 ? `Tax Invoice ${invoiceId}` : 'Invoice';
      const invoice = `<h1>${invoiceTitle}</h1>`;
      const currDate = `<h3>${formatDate(invoiceDate)}</h3>`
      const userDetails = `
      <div class='header'>
          <span>
          ${business.name}
          </span>
          <span>
          ABN ${business.ABN}
          </span>
          <span>
              ${business.email}
          </span
      </div>
      `;
      document.body.innerHTML = `<div class="user-details">${userDetails}</div>` + `<div class="invoice-date">${invoice}${currDate}</div>` + invoiceTable  + totalAmountText +   `<div class="details-wrapper" style="page-break-inside:avoid">${clientDetails}${bankingDetails}</div>`;
  }
  function renderTimesheet(text, adjustments = [], invoiceDate, titlePrefix) {
      const rows = text.split('\n').filter(v => v).map(replaceLine).concat(adjustments);
      const result = rows.map(columns => `<tr><td>${columns.map(v => v.toFixed ? v.toFixed(2) : v).join('</td><td>')}</td></tr>`).join('\n');
      const firstDate = rows[0][0];
      const lastDate = R.last(rows)[0];
      document.body.innerHTML = `<h1>${titlePrefix} - ${firstDate} to ${lastDate}</h1>` +  '<table><thead><tr><th>Date</th><th>Time</th><th>Description</th><th>Hours</th></tr></thead><tbody>' + result + '</tbody></table><h1>Total Hours: ' + sum(rows.map(arr => arr[3])).toFixed(2) + 'hrs</h1>';
  }
  return {
    renderInvoice,
    renderTimesheet,
  };
}
