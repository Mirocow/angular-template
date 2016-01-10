app.controller('TransactionsController', [
'$scope',
'TransactionsStore',
function($scope, TransactionsStore) {

  TransactionsStore.loadTransactions();

  this.addTransaction = function() {
    TransactionsStore.addTransaction(this.newTransaction);
    this.resetTransaction();
  }

  this.resetTransaction = function() {
    this.newTransaction = {
      amount: 0.0,
      date: "1993-02-01",
      description: null
    }
  }
  this.transactions = TransactionsStore.transactions;

  this.resetTransaction();
}]);