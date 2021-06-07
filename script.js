let money;
let isNumber = function(n) {
    return isNaN(parseFloat(n)) && isFinite(n)
};

function start() {
    do {
        money = prompt('Какой твой месячный доход?');
    } while(isNaN(money) || money === '' || money === null);    
};


start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 5,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: money,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses;
        let deposit;
        let i = 0;
        let exp;
        let sum;
        let itemIncome;
        let cashIncome;

        if (confirm('Есть ли у тебя дополнительный источник заработка?')) {
            do {
                itemIncome = prompt('Какой у тебя допольнительный источник заработка?');
            } while (!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null);
            do {
                cashIncome = prompt('Сколько в месяц ты зарабатываешь на этом?');
            } while (isNaN(cashIncome) || cashIncome.trim() === '' || cashIncome === null);
            appData.income[itemIncome] = cashIncome;
        }
        do {
                addExpenses = prompt('Перечисли возможные расходы за определенный период через запятую');
            } while (!isNaN(addExpenses) || addExpenses.trim() === '' || addExpenses === null);
        appData.addExpenses = addExpenses.split(' , ').map(word => { return word[0].toUpperCase() + word.slice(1)} );
        // appData.addExpenses.forEach(function (item, i) {
        //     item = item.charAt(0).toUpperCase() + item.substr(1);
        //     console.log(item);
        // }) 
        // for (let word in appData.addExpenses) {
        // word = word.charAt(0).toUpperCase() + word.substr(1);
        // console.log(word);
        // }
        appData.deposit = confirm('У тебя есть депозит в банке? Нажми OK, если есть.');
        while (i < 2) {
             do {
                exp = prompt('Назови обязательную статью расходов.');
            } while (!isNaN(exp) || exp.trim() === '' || exp === null);
            do {
                sum = prompt('Во сколько это обойдется?');
            } while (isNaN(sum) || sum.trim() === '' || sum === null);
            i++;
            appData.expenses[exp] = Number(sum);
        }
    },
    budgetDay: function() {
        return Math.floor(appData.getBudget() / 30);
    },
    expMonth: function () {
        let res = 0;
        for (let key in appData.expenses) {
            res += appData.expenses[key]
        }
        return appData.expensesMonth = res;
    },

    getBudget: function() {
        return appData.budget - appData.expensesMonth;
    },

    getTargetMonth: function() {
        return Math.round(appData.mission / appData.getBudget());    
    },

    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У тебя высокий уровень дохода';
        } else if (600 <= appData.budgetDay <= 1200) {
            return 'У тебя средний уровень дохода';
        } else if (0 <= appData.budgetDay <= 600) {
            return 'К сожалению, уровень дохода у тебя низкий';
        } else {
            return 'Что-то пошло не так :(';
        }
    },

    getBudgetDay: function() {
        return Math.floor(appData.getBudget() / 30);
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            } while (isNaN(appData.percentDeposit) || appData.percentDeposit.trim() === '' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма?');
            } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null);
        }
    }, 

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};

appData.asking();

appData.getInfoDeposit();

appData.expMonth();

appData.getBudget();

appData.getTargetMonth();

appData.budgetDay = appData.getBudget();

appData.getStatusIncome();

console.log(appData.expenses);

console.log(appData.getStatusIncome());



if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута через... ' + appData.getTargetMonth());
} else {
    console.log('Цель не будет достигнута :(');
}

console.log('Бюджет на день: ', appData.getBudgetDay());

console.log('Расходы на месяц составили: ' + appData.expensesMonth);

for (let key in appData) {
    console.log( "Ключ: " + key + " значение: " + appData[key] );
}



a = appData.addExpenses
a = a.map(word => { return word.charAt(0).toUpperCase() + word.slice(1)} );
console.log(a);
