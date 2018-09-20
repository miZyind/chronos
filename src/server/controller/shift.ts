import { IRouterContext } from 'koa-router';
import operation from '../libs/operation';

class ShiftController {

  public static async getAll(ctx: IRouterContext) {
    const getStationData = await operation.checkTable(ctx.db, '/station');
    const getGroupByArea = await operation.groupByKey(getStationData, 'area', 'all');
    const getWorkerData = await operation.checkTable(ctx.db, '/worker');
    const data = { 'station': getGroupByArea, 'worker': getWorkerData};
    ctx.body = data;
    ctx.status = 200;
  }
  public static async getOneByMonth(ctx: IRouterContext) {
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getWorkerData = await operation.checkTable(ctx.db, '/worker');
    const getShiftData = await operation.checkTable(ctx.db, `/shift/${getYear}/${getMonth}`);
    const getStationData = await operation.checkTable(ctx.db, `/station`);
    if (Object.keys(getShiftData).length < 1) {
      // using exit station to create shift
      Object.keys(getStationData).map((id: any) => {
        const max = parseInt(getStationData[id].workerNumber);
        for (let i = 1; i <= max; i++) {
          const emptyWork = `empty-${i}`;
          ctx.db.push(`/shift/${getYear}/${getMonth}/${id}/${emptyWork}`, {
            stationName: getStationData[id].name,
            workerName: '',
            shift: {}
          });
        }
      });
    } else {
      // using exit station to update shift
      // 不刪除 stationshift & 個人shift
      Object.keys(getStationData).map((stationId: any) => {
        const stationMax = parseInt(getStationData[stationId].workerNumber);
        if (getShiftData[stationId]) {
          const shiftMax = Object.keys(getShiftData[stationId]).length;
          if (stationMax > shiftMax) {
            for (let i = shiftMax + 1; i <= stationMax; i++) {
              const emptyWork = `empty-${i}`;
              ctx.db.push(`/shift/${getYear}/${getMonth}/${stationId}/${emptyWork}`, {
                stationName: getStationData[stationId].name,
                workerName: '',
                shift: {}
              });
            }
          }
        } else {
          const max = parseInt(getStationData[stationId].workerNumber);
          for (let i = 1; i <= max; i++) {
            const emptyWork = `empty-${i}`;
            ctx.db.push(`/shift/${getYear}/${getMonth}/${stationId}/${emptyWork}`, {
              stationName: getStationData[stationId].name,
              workerName: '',
              shift: {}
            });
          }
        }
      });
    }
    const getShiftNewData = await operation.checkTable(ctx.db, `/shift/${getYear}/${getMonth}`);
    const data = { 'shiftList': getShiftNewData, 'worker': getWorkerData };
    ctx.body = data;
    ctx.status = 200;
  }
  public static async getOne(ctx: IRouterContext) {
    ctx.body = [];
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getStationId = ctx.params.stationid;
    const getWorkerId = ctx.params.workerid;
    const getData = await operation.checkTable(ctx.db, `/shift/${getYear}/${getMonth}/${getStationId}/${getWorkerId}`);
    if (getData) {
      ctx.body = getData;
    }
    ctx.status = 200;
  }
  public static async getAllByArea(ctx: IRouterContext) {
    ctx.body = [];
    const getArea = ctx.params.area;
    const getData = await operation.checkTable(ctx.db, `/station`);
    if (getData) {
      const getGroupByArea = await operation.groupByKey(getData, 'area', getArea);
      ctx.body = getGroupByArea;
    }
    ctx.status = 200;
  }

  public static async edit(ctx: IRouterContext) {
    const getYear = ctx.request.body!.year;
    const getMonth = ctx.request.body!.month;
    const getStationId = ctx.request.body!.stationid;
    const getStationName = ctx.request.body!.stationname;
    const getOldWorkerId = ctx.request.body!.oldworkerid;
    const getNewWorkerId = ctx.request.body!.newworkerid;
    const getWorkerName = ctx.request.body!.workername;
    const getNewShift = ctx.request.body!.shift;

    const getOldData = await operation.checkTable(ctx.db, `/shift/${getYear}/${getMonth}/${getStationId}/${getOldWorkerId}`);
    if (getOldData) {
      const getOldShift = getOldData.shift;
      Object.keys(getOldShift).map((id: any) => {
        if (getOldShift[id].shiftType === '休') {
          const getDayoffData = operation.checkTable(ctx.db, `/hourCounts/${getYear}/${getMonth}/${getOldShift[id].cover.id}/cover/${id}`);
          if (Object.keys(getDayoffData).length > 0) {
            ctx.db.delete(`/hourCounts/${getYear}/${getMonth}/${getOldShift[id].cover.id}/cover/${id}`);
          }
        }
      });
      ctx.db.delete(`/shift/${getYear}/${getMonth}/${getStationId}/${getOldWorkerId}`);
    }
    const getOldHourCountData = await operation.checkTable(ctx.db, `/hourCounts/${getYear}/${getMonth}/${getOldWorkerId}/nomal`);
    console.log(Object.keys(getOldHourCountData).length);
    if (Object.keys(getOldHourCountData).length > 0) {
      ctx.db.delete(`/hourCounts/${getYear}/${getMonth}/${getOldWorkerId}/nomal`);
    }
    // count times
    const getStationData = await operation.checkTable(ctx.db, `/station/${getStationId}`);
    const getDayStart = getStationData.dayStart;
    const getDayEnd = getStationData.dayEnd;
    const getNightStart = getStationData.nightStart;
    const getNightEnd = getStationData.nightEnd;
    const dayDiff = await operation.countHour(getDayStart, getDayEnd);
    const nightDiff = await operation.countHour(getNightStart, getNightEnd);
    let dayCount = 0;
    let nightCount = 0;
    Object.keys(getNewShift).map((id: any) => {
      if (getNewShift[id].shiftType === '日') {
        dayCount++;
      } else if (getNewShift[id].shiftType === '夜') {
        nightCount++;
      } else if (getNewShift[id].shiftType === '休') {
        const getCountData1 = operation.checkTable(ctx.db, `/hourCounts/${getYear}/${getMonth}/${getNewShift[id].cover.id}`);
        if (getCountData1.length === 0) {
          ctx.db.push(`/hourCounts/${getYear}/${getMonth}/${getNewShift[id].cover.id}`, {
            workerId: getNewShift[id].cover.id,
            workerName: getNewShift[id].cover.name
          });
        }
        ctx.db.push(`/hourCounts/${getYear}/${getMonth}/${getNewShift[id].cover.id}/cover/${id}`, {
          day: id,
          stationName: getStationName,
          stationId: getStationId,
        });
      }
    });
    const getTotalDayHours = dayCount * dayDiff;
    const getTotalNightHours = nightCount * nightDiff;
    ctx.db.push(`/shift/${getYear}/${getMonth}/${getStationId}/${getNewWorkerId}`, {
      stationName: getStationName,
      workerName: getWorkerName,
      totalDays: dayCount,
      totalNights: nightCount,
      totalDayHours: getTotalDayHours,
      totalNightHours: getTotalNightHours,
      shift: getNewShift
    });
    const getCountData = await operation.checkTable(ctx.db, `/hourCounts/${getYear}/${getMonth}/${getNewWorkerId}`);
    if (Object.keys(getCountData).length === 0) {
      ctx.db.push(`/hourCounts/${getYear}/${getMonth}/${getNewWorkerId}`, {
        workerId: getNewWorkerId,
        workerName: getWorkerName
      });
    }
    ctx.db.push(`/hourCounts/${getYear}/${getMonth}/${getNewWorkerId}/nomal/${getStationId}`, {
      stationId: getStationId,
      stationName: getStationName,
      totalDays: dayCount,
      totalNights: nightCount,
      totalDayHours: getTotalDayHours,
      totalNightHours: getTotalNightHours
    });
    ctx.status = 200;
  }

  public static async delete(ctx: IRouterContext) {
    ctx.db.delete(`/shift`);
    ctx.db.delete(`/hourCounts`);
    ctx.status = 200;
  }

  public static async getShiftByWorker(ctx: IRouterContext) {
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getStationArea = ctx.params.stationarea;
    const getStationStartId = ctx.params.stationstart;
    const getStationCount = ctx.params.count;
    const totalStationShifts: any[] = [];
    // Get all stations
    const getStationData = await operation.checkTable(ctx.db, `/station`);
    // Get all workers
    const getWorkerData = await operation.checkTable(ctx.db, `/worker`);
    // Divide stations group by area
    const getStationGroupByArea = await operation.groupByKey(getStationData, 'area', getStationArea);
    let stationCount = parseInt(getStationCount);
    let stationIndex = 0;
    Object.keys(getStationGroupByArea).map((area: string) => {
      const getArrayByArea = Object.values(getStationGroupByArea[area]);
      getArrayByArea.map((station: any) => {
        stationIndex++;
        // console.log(station.id + '----' + stationIndex);
        if (parseInt(getStationStartId) <= stationIndex && stationCount !== 0) {
          const stationShift: {
            stationId: string
            stationName: string,
            workerShift: any
          } = { 'stationId': station.id, 'stationName': station.name, 'workerShift': {} };
          // Get shifts by year,month and station
          const getStationShift = operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${station.id}`);
          if (getStationShift) {
            // Get nomal work day of station in getyear and  getmonth
            const getNomalShift = getStationShift.nomal;
            const totalWorkerShifts: any[] = [];
            if (getNomalShift) {
              Object.keys(getNomalShift).map((nomalWorkerId: any) => {
                let getNomalWorkerName = 'no name';
                if (getWorkerData[nomalWorkerId].name) {
                  getNomalWorkerName = getWorkerData[nomalWorkerId].name;
                }
                let getDay = [];
                let getNight = [];
                let getCover: any = [];
                const singleNomalWorkerShift: any = [];
                for (let i = 0; i <= 30; i++) {
                  singleNomalWorkerShift[i] = '無';
                }
                if (getNomalShift[nomalWorkerId].day) {
                  getDay = getNomalShift[nomalWorkerId].day;
                  getDay.map((dayId: number) => {
                    singleNomalWorkerShift[dayId - 1] = '日';
                  });
                }
                if (getNomalShift[nomalWorkerId].night) {
                  getNight = getNomalShift[nomalWorkerId].night;
                  getNight.map((dayId: number) => {
                    singleNomalWorkerShift[dayId - 1] = '夜';
                  });
                }
                // Get cover work day of station in this month
                const getCoverShift = getStationShift.cover;
                if (getCoverShift[nomalWorkerId]) {
                  getCover = getCoverShift[nomalWorkerId];
                  if (getCover) {
                    Object.keys(getCover).map((coverWorkerId: any) => {
                      if (getCover[coverWorkerId].coverDay) {
                        const getCoverDays = getCover[coverWorkerId].coverDay;
                        getCoverDays.map((coverDay: number) => {
                          let getCoverWorkerName = 'no name';
                          if (getWorkerData[getCover[coverWorkerId].coverWorker].name) {
                            getCoverWorkerName = getWorkerData[getCover[coverWorkerId].coverWorker].name;
                          }
                          singleNomalWorkerShift[coverDay - 1] = getCoverWorkerName;
                        });
                      }
                    });
                  }
                }
                const shift: {
                  nomalWorkerId: string
                  nomalWorkerName: string,
                  dayShift: any
                } = { 'nomalWorkerId': nomalWorkerId, 'nomalWorkerName': getNomalWorkerName, 'dayShift': singleNomalWorkerShift };
                totalWorkerShifts.push(shift);
              });
            }
            // check remain count of station's workerNumber
            if (totalWorkerShifts.length < parseInt(station.workerNumber)) {
              const remainNumber = parseInt(station.workerNumber) - totalWorkerShifts.length;
              for (let w = 1; w <= remainNumber; w++) {
                const singleNomalWorkerShift = [];
                for (let i = 0; i <= 30; i++) {
                  singleNomalWorkerShift[i] = '無';
                }
                const shift: {
                  nomalWorkerId: string
                  nomalWorkerName: string,
                  dayShift: any
                } = { 'nomalWorkerId': '無', 'nomalWorkerName': '無', 'dayShift': singleNomalWorkerShift };
                totalWorkerShifts.push(shift);
              }
            }
            stationShift.workerShift = totalWorkerShifts;
            totalStationShifts.push(stationShift);
          }
          stationCount = stationCount - 1;
        }
      });
    });
    ctx.body = totalStationShifts;
  }
}

export default ShiftController;
