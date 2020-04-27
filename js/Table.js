class Table {
    constructor( account, months ) {
        this.account = account.sort( ( a, b ) => { return a.month - b.month } )       
        this.months = months
        this.nameDom = document.querySelector( '.container > .row > h1' )
        this.tableDom = document.querySelector( '.table-content' )
        this.footerDom = document.querySelector( '.table-footer' )
        this.summaryDom = document.querySelector( '.summary-list' )
        this.nameDom.innerHTML = 'Viktoro metai'
        this.init()       
    }

    init() {
        this.parseArray()
        this.renderFooter()
        this.renderSummary()
    }

    parseArray() {
        let rowHtml = ''
        let income
        let expense
        let flow
        let balance = 0
        this.incomes = 0
        this.expenses = 0
        let maxIncome = 0
        let maxExpense = 0
        let minIncome = null
        let minExpense = null
        this.maxIncomeMonth = ''
        this.maxExpenseMonth = ''
        this.minIncomeMonth = ''
        this.minExpenseMonth = ''

        this.account.forEach( 
            ( row, index ) => {
                for (let i = 0; i < this.months.length; i++) {
                    const month = this.months[i]
                    if ( row.month === month.id ) row.monthName = month.name
                }

                if ( row.income ) income = row.income
                else income = 0
                if ( row.expense ) expense = row.expense
                else expense = 0
                flow = income - expense
                balance += flow

                rowHtml += `
                    <div class="table-row">
                        <div class="cell">${index + 1}</div>
                        <div class="cell">${row.monthName}</div>
                        <div class="cell">${income ? income + ' Eur' : '-'}</div>
                        <div class="cell">${expense ? expense + ' Eur' : '-'}</div>
                        <div class="cell">${flow} Eur</div>
                        <div class="cell">${balance} Eur</div>
                    </div>
                `

                if ( !minIncome && row.income || ( row.income >= 0 && row.income < minIncome ) ) {
                    minIncome = row.income
                    this.minIncomeMonth = row.monthName
                }

                if ( row.income > maxIncome ) {
                    maxIncome = row.income
                    this.maxIncomeMonth = row.monthName
                }

                if ( !minExpense && row.expense || ( row.expense >= 0 && row.expense < minExpense ) ) {
                    minExpense = row.expense
                    this.minExpenseMonth = row.monthName
                }

                if ( row.expense > maxExpense ) {
                    maxExpense = row.expense
                    this.maxExpenseMonth = row.monthName
                }

                if ( row.income ) this.incomes += row.income
                if ( row.expense ) this.expenses += row.expense
            }
        )

        this.tableDom.innerHTML = rowHtml
        this.flow = this.incomes - this.expenses
    }

    renderFooter() {
        this.footerDom.innerHTML = `
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell">${this.incomes} Eur</div>
            <div class="cell">${this.expenses} Eur</div>
            <div class="cell">${this.flow} Eur</div>
        `
    }

    renderSummary() {
        this.summaryDom.innerHTML = `
            <div class="item">
                <div id="minIncome" class="value">${this.minIncomeMonth}</div>
                <div class="title">mėnuo, kai buvo mažiausiai uždirbta,bet ne lygu nuliui</div>
            </div>
            <div class="item">
                <div class="value">${this.maxIncomeMonth}</div>
                <div class="title">mėnuo, kai buvo daugiausiai uždirbta</div>
            </div>
            <div class="item">
                <div class="value">${this.minExpenseMonth}</div>
                <div class="title">mėnuo, kai buvo mažiausiai išlaidos, bet ne lygios nuliui</div>
            </div>
            <div class="item">
                <div class="value">${this.maxExpenseMonth}</div>
                <div class="title">mėnuo, kai buvo didžiausios išlaidos</div>
            </div>
        `
    }
}

export default Table