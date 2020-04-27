class Table {
    constructor( account, months ) {
        this.account = account
        this.months = months
        this.nameDom = document.querySelector( '.container > .row > h1' )
        this.tableDom = document.querySelector( '.table-content' )
        this.footerDom = document.querySelector( '.table-footer' )
        this.summaryDom = document.querySelector( '.summary-list' )
        this.name = 'Viktoro'
        this.init()       
    }

    init() {
        this.ownName()
        this.parseMonths()
        this.renderRows()
        this.renderFooter()
        this.renderSummary()
    }

    ownName() {
        this.nameDom.innerHTML = this.name + ' metai'
    }

    parseMonths() {
        this.account.forEach( 
            ( row ) => {
                for (let i = 0; i < this.months.length; i++) {
                    const month = this.months[i]
                    if ( row.month === month.id ) row.monthName = month.name
                }
            }
        )
    }

    renderRows() {
        let rowHtml = ''
        let income
        let expense
        let balance
        this.account.forEach( 
            ( row, index ) => {

                if ( row.income ) income = row.income
                else income = 0

                if ( row.expense ) expense = row.expense
                else expense = 0

                balance = income - expense + ' Eur'

                if ( income === 0 ) income = '-'
                else income = income + ' Eur'
                if ( expense === 0 ) expense = '-'
                else expense = expense + ' Eur'

                rowHtml += `
                <div class="table-row">
                    <div class="cell">${index + 1}</div>
                    <div class="cell">${row.monthName}</div>
                    <div class="cell">${income}</div>
                    <div class="cell">${expense}</div>
                    <div class="cell">${balance}</div>
                </div>
                `
            }
        )
        this.tableDom.innerHTML = rowHtml
    }

    renderFooter() {
        let incomes = 0
        let expenses = 0
        this.account.forEach( 
            ( row ) => {
                if ( row.income ) incomes += row.income
                if ( row.expense ) expenses += row.expense
            }
        )
        const balance = incomes - expenses
        let footerHtml = `
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell">${incomes} Eur</div>
            <div class="cell">${expenses} Eur</div>
            <div class="cell">${balance} Eur</div>
        `
        this.footerDom.innerHTML = footerHtml
    }

    renderSummary() {
        let maxIncome = 0
        let maxExpense = 0
        let minIncome = this.account[0].income // reiktu geriau
        let minExpense = this.account[1].expense // reiktu geriau
        let maxIncomeMonth = ''
        let maxExpenseMonth = ''
        let minIncomeMonth = ''
        let minExpenseMonth = ''

        this.account.forEach( 
            ( row ) => {

                if ( row.income >= 0 && row.income < minIncome ) {
                    minIncome = row.income
                    minIncomeMonth = row.monthName
                }

                if ( row.income > maxIncome ) {
                    maxIncome = row.income
                    maxIncomeMonth = row.monthName
                }

                if ( row.expense >= 0 && row.expense < minExpense ) {
                    minExpense = row.expense
                    minExpenseMonth = row.monthName
                }

                if ( row.expense > maxExpense ) {
                    maxExpense = row.expense
                    maxExpenseMonth = row.monthName
                }

            }
        )

        let summaryHtml = `
        <div class="item">
            <div id="minIncome" class="value">${minIncomeMonth}</div>
            <div class="title">mėnuo, kai buvo mažiausiai uždirbta,bet ne lygu nuliui</div>
        </div>
        <div class="item">
            <div class="value">${maxIncomeMonth}</div>
            <div class="title">mėnuo, kai buvo daugiausiai uždirbta</div>
        </div>
        <div class="item">
            <div class="value">${minExpenseMonth}</div>
            <div class="title">mėnuo, kai buvo mažiausiai išlaidos, bet ne lygios nuliui</div>
        </div>
        <div class="item">
            <div class="value">${maxExpenseMonth}</div>
            <div class="title">mėnuo, kai buvo didžiausios išlaidos</div>
        </div>
        `
        this.summaryDom.innerHTML = summaryHtml
    }
}

export default Table