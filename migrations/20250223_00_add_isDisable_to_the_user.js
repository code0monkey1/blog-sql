import { DataTypes } from 'sequelize'

 export const  up =async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'isDisabled', {
      type: DataTypes.BOOLEAN,
      defalutValue:false
    })
  }
 export const down= async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'isDisabled')
   
  }
