import {NativeModules} from 'react-native';

const {BatteryModule} = NativeModules;

export const getBatteryTemperature = async (): Promise<number> => {
  try {
    return await BatteryModule.getBatteryTemperature();
  } catch (error) {
    console.error('❌ getBatteryTemperature error:', error);
    return 0;
  }
};

export const getBatteryLevel = async (): Promise<number> => {
  try {
    return await BatteryModule.getBatteryLevel();
  } catch (error) {
    console.error('❌ getBatteryTemperature error:', error);
    return 0;
  }
};

export const getBatteryHealth = async (): Promise<string> => {
  try {
    return await BatteryModule.getBatteryHealth();
  } catch (error) {
    console.error('❌ getBatteryHealth error:', error);
    return 'Unknown';
  }
};

export const getBatteryCapacity = async (): Promise<number> => {
  try {
    return await BatteryModule.getBatteryCapacity();
  } catch (error) {
    console.error('❌ getBatteryCapacity error:', error);
    return -1;
  }
};

export const getBatteryTechnology = async (): Promise<string> => {
  try {
    return await BatteryModule.getBatteryTechnology();
  } catch (error) {
    console.error('❌ getBatteryTechnology error:', error);
    return 'Unknown';
  }
};
