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
        const max = parseInt(getStationData[id].stableNumber);
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
        const stationMax = parseInt(getStationData[stationId].stableNumber);
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
          const max = parseInt(getStationData[stationId].stableNumber);
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
}

export default ShiftController;
