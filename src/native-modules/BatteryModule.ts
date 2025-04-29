import {NativeModules} from 'react-native';

const {BatteryModule} = NativeModules;

export const getBatteryTemperature = async (): Promise<number> => {
  try {
    const temp = await BatteryModule.getBatteryTemperature();
    return temp;
  } catch (error) {
    console.error('Failed to get battery temperature:', error);
    return 0;
  }
};

export const getBatteryHealth = async () => {
  try {
    const health = await BatteryModule.getBatteryHealth();
    return health;
  } catch (error) {
    console.error(error);
    return 'Unknown';
  }
};

export const getBatteryCapecity = async () => {
  try {
    const capecity = await BatteryModule.getBatteryCapacity();
    return capecity;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const getBatteryTechnology = async (): Promise<string> => {
  try {
    const technology = await BatteryModule.getBatteryTechnology();
    return technology;
  } catch (error) {
    console.error('Error fetching battery technology:', error);
    return 'Unknown';
  }
};
