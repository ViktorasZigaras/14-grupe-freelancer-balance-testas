class Table {
    constructor( account, months ) {
        this.account = account
        this.months = months
        this.tableDom = document.querySelector( '.table-content' )
        this.footerDom = document.querySelector( '.table-footer' )
        this.init()       
    }

    init() {
        this.parseMonths()
        this.renderRows()
        this.renderFooter()
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
}

export default Table