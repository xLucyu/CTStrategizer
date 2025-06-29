export type EventData = {
  [eventCode: string]: {
    EventNumber: number;
    Code: string;
    TileType: string;
    RelicType: string;
    GameData: {
      selectedMap: string;
      bossData?: {
        bossBloon: number;
        TierCount: number;
      };
      selectedMode: string;
      subGameType: number;
      selectedDifficulty: string;
      dcModel: {
        startRules: {
          lives: number;
          cash: number;
          round: number;
          endRound: number;
        };
        map: string;
        mode: string;
        difficulty: string;
        maxTowers: number;
        disableMK: boolean;
        disableSelling: boolean;
        bloonModifiers: {
          healthMultipliers: {
            bloons: number;
            moabs: number;
          };
          speedMultiplier: number;
          moabSpeedMultiplier: number;
          regrowRateMultiplier: number;
        };
        towers: {
          _items: TowerData[];
        };
      };
    };
  };
};

export type TowerData = {
  tower: string;
  isHero: boolean;
  max: number;
};
