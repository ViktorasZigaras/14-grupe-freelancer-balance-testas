class Table {
    constructor( account, months ) {
        this.account = account
        this.months = months
        this.tableDom = document.querySelector( '.table-content' )
        this.init()       
    }

    init() {
        this.parseMonths()
        this.render()
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

    render() {
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

                console.log(income, expense);
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
}

export default Table