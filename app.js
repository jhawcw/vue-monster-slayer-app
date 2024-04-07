const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      log: [],
    };
  },
  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.log = [];
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLog("Player", "Attacks", attackValue);
      this.currentRound++;
      this.attackPlayer();
      this.displayHealth();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.currentRound++;
      this.addLog("Monster", "Attacks", attackValue);
    },
    displayHealth() {
      console.log("Player Health: ", this.playerHealth);
      console.log("Monster Health: ", this.monsterHealth);
      console.log("Winning state: ", this.winner);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLog("Player", "Attacks", attackValue);
      this.currentRound++;
      this.attackPlayer();
      this.displayHealth();
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      this.addLog("Player", "Heals", healValue);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.currentRound++;
      this.attackPlayer();
      this.displayHealth();
    },
    surrender() {
      this.winner = "monster";
    },
    addLog(player, action, value) {
      // this.log.unshift(`${player} ${action} for ${value} points!`);
      this.log.unshift({
        actionBy: player,
        actionType: action,
        actionValue: value,
      });
    },
  },
  computed: {
    setPlayerHealth() {
      if (this.playerHealth <= 0) {
        return { width: 0 + "%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    setMonsterHealth() {
      // if (this.monsterHealth <= 0) {
      //   return { width: 0 + "%" };
      // } else {
      //   return { width: this.monsterHealth + "%" };
      // }
      return this.monsterHealth <= 0 ? { width: 0 + "%" } : { width: this.monsterHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    mayPlayerHeal() {
      return !(this.playerHealth < 100);
    },
  },
  watch: {
    playerHealth(newVal, prevVal) {
      if (newVal <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (newVal <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(newVal, prevVal) {
      if (newVal <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (newVal <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },
});

// const max = 12;
// const min = 5;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + max;
}

app.mount("#game");
