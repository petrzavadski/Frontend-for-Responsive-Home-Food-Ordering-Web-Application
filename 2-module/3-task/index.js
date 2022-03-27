let calculator = {
  // ваш код

    f:0,
    s:0,
    read(f, s){
      this.f=f
      this.s=s
    },
    sum(){
      return +this.f+ this.s;
    },
    mul(){
      return +this.f*this.s
    }
 
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
