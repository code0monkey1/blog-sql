import { DataTypes } from 'sequelize'

 export const  up =async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'date', {
      type: DataTypes.DATE,
      defalutValue:DataTypes.NOW,
      validate:{
        isDate:true,
        isBefore:new Date().toISOString(),
        isAfter:new Date(1991,0,1),
        isNull:false,
        msg:"Date must be a valid date before today and after 1991"
      }
    })
  }
 export const down= async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'date')
   
  }
