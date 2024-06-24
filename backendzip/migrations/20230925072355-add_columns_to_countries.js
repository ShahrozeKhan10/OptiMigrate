"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.addColumn(
          "countries",
          "gdp",
          {
            type: Sequelize.INTEGER,
          },
          { transaction }
        );
        await queryInterface.addColumn(
          "countries",
          "total_population",
          {
            type: Sequelize.BIGINT,
          },
          { transaction }
        );
        await queryInterface.addColumn(
          "countries",
          "pakistanis",
          {
            type: Sequelize.INTEGER,
          },
          { transaction }
        );
        await queryInterface.addColumn(
          "countries",
          "muslim_population",
          {
            type: Sequelize.INTEGER,
          },
          { transaction }
        );
        await queryInterface.addColumn(
          "countries",
          "muslim_percentage",
          {
            type: Sequelize.FLOAT,
          },
          { transaction }
        );
        await queryInterface.addColumn(
          "countries",
          "world_muslim_percentage",
          {
            type: Sequelize.FLOAT,
          },
          { transaction }
        );

        await transaction.commit();
      } catch (error) {
        console.log(error);
        await transaction.rollback();
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.removeColumn("countries", "gdp", { transaction });
        await queryInterface.removeColumn("countries", "total_population", {
          transaction,
        });
        await queryInterface.removeColumn("countries", "pakistanis", {
          transaction,
        });
        await queryInterface.removeColumn("countries", "muslim_population", {
          transaction,
        });
        await queryInterface.removeColumn("countries", "muslim_percentage", {
          transaction,
        });
        await queryInterface.removeColumn(
          "countries",
          "worldMuslimPercentage",
          {
            transaction,
          }
        );

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
      }
    });
  },
};

/*
  -- Temporary data added for 10 countries
  UPDATE countries
  SET
      country = CASE id
          WHEN 230 THEN 'USA'
          WHEN 33 THEN 'Canada'
          WHEN 2 THEN 'UAE'
          WHEN 51 THEN 'Germany'
          WHEN 69 THEN 'France'
          WHEN 71 THEN 'UK'
          WHEN 12 THEN 'Australia'
          WHEN 158 THEN 'New Zealand'
          WHEN 103 THEN 'Japan'
          WHEN 100 THEN 'Italy'
      END,
      gpd = CASE id
          WHEN 230 THEN 76370
          WHEN 33 THEN 52960
          WHEN 2 THEN 48950
          WHEN 51 THEN 53390
          WHEN 69 THEN 45860
          WHEN 71 THEN 48890
          WHEN 12 THEN 60430
          WHEN 158 THEN 48460
          WHEN 103 THEN 42440
          WHEN 100 THEN 37700
      END,
      muslimPopulation = CASE id
          WHEN 230 THEN 3450000
          WHEN 33 THEN 1148213
          WHEN 2 THEN 4615081
          WHEN 51 THEN 4750000
          WHEN 69 THEN 5720000
          WHEN 71 THEN 4130000
          WHEN 12 THEN 650000
          WHEN 158 THEN 41000
          WHEN 103 THEN 185000
          WHEN 100 THEN 2987840
      END,
      totalPopulation = CASE id
          WHEN 230 THEN 339996563
          WHEN 33 THEN 38781291
          WHEN 2 THEN 9516871
          WHEN 51 THEN 83294633
          WHEN 69 THEN 64756584
          WHEN 71 THEN 67736802
          WHEN 12 THEN 26439111
          WHEN 158 THEN 5228100
          WHEN 103 THEN 123294513
          WHEN 100 THEN 58870762
      END,
      muslimPercentage = CASE id
          WHEN 230 THEN 1.1
          WHEN 33 THEN 3.2
          WHEN 2 THEN 76
          WHEN 51 THEN 5.7
          WHEN 69 THEN 8.8
          WHEN 71 THEN 6.3
          WHEN 12 THEN 2.6
          WHEN 158 THEN 0.9
          WHEN 103 THEN 0.1
          WHEN 100 THEN 4.8
      END,
      worldMuslimPercentage = CASE id
          WHEN 230 THEN 0.2
          WHEN 33 THEN 0.1
          WHEN 2 THEN 0.2
          WHEN 51 THEN 0.2
          WHEN 69 THEN 0.3
          WHEN 71 THEN 0.2
          WHEN 12 THEN 0
          WHEN 158 THEN 0
          WHEN 103 THEN 0
          WHEN 100 THEN 0.1
      END,
      pakistanis = CASE id
          WHEN 230 THEN 629946
          WHEN 33 THEN 215560
          WHEN 2 THEN 1500000
          WHEN 51 THEN 73975
          WHEN 69 THEN 120000
          WHEN 71 THEN 1174983
          WHEN 12 THEN 64346
          WHEN 158 THEN 3261
          WHEN 103 THEN 14312
          WHEN 100 THEN 118181
      END
  WHERE id IN (230, 33, 2, 51, 69, 71, 12, 158, 103, 100);

*/
