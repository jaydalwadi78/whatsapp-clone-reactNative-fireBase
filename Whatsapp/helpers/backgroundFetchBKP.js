import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';


//const INTERVAL = 1

export async function registerFetchTask() {
  //alert("a")
  const status = await BackgroundFetch.getStatusAsync();
  switch (status) {
      case BackgroundFetch.Status.Restricted:
      case BackgroundFetch.Status.Denied:
          console.log("Background execution is disabled");
          return;
      default: {
          console.debug("Background execution allowed");
          try {
            await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
              minimumInterval: 10
            })
            console.log("Task registered")

            console.log("set minimum interval ...");
            await BackgroundFetch.setMinimumIntervalAsync(10);
            console.log("OK");
          } catch (err) {
            console.log("Task Register failed:", err)
          }
    /*      console.log("Setting interval to", INTERVAL);
    await BackgroundFetch.setMinimumIntervalAsync(INTERVAL);*/
      }
  }
}



TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  try {
    // fetch data here...

    const receivedNewData = Math.random()
    console.log("My task ", receivedNewData)
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
});


