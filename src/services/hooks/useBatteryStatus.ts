import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {setBatteryInfo} from '../../store/slices/batterySlice';
import DeviceInfo, {usePowerState} from 'react-native-device-info';
import {
  getBatteryCapecity,
  getBatteryHealth,
  getBatteryTechnology,
  getBatteryTemperature,
} from '../../native-modules/BatteryModule';

const useBatteryStatus = () => {
  const dispatch = useAppDispatch();
  const powerState = usePowerState();

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      const isCharging = await DeviceInfo.isBatteryCharging();
      const batteryLevel = await DeviceInfo.getBatteryLevel();
      const batteryTemprature = await getBatteryTemperature();
      const batteryHealth = await getBatteryHealth();
      const batteryCapecity = await getBatteryCapecity();
      const batteryTechnology = await getBatteryTechnology();

      dispatch(
        setBatteryInfo({
          isCharging,
          batteryLevel,
          batteryTemprature,
          batteryHealth,
          batteryCapecity,
          batteryTechnology,
        }),
      );
    };

    fetchBatteryStatus();
  }, [dispatch, powerState]);
};

export default useBatteryStatus;
