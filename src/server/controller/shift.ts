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
  public static async getSingleWorkerByMonth(ctx: IRouterContext) {
    ctx.body = [];
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getStationId = ctx.params.stationid;
    const getWorkerId = ctx.params.workerid;
    const getLastDay = new Date(getYear, getMonth, 0).getDate();
    // Get all workers
    const getWorkerData = await operation.checkTable(ctx.db, `/worker`);
    const getNomalData = await operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/nomal/${getWorkerId}`);
    const getCoverData = await operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getWorkerId}/list`);
    let singleNomalWorkerShift = operation.initEveryDayPerMonth(getLastDay);
    // Get nomal day of station in this month
    singleNomalWorkerShift = operation.pushNomalDayTypeToShifts(getNomalData.day, '日', singleNomalWorkerShift);
    // Get nomal night of station in this month
    singleNomalWorkerShift = operation.pushNomalDayTypeToShifts(getNomalData.night, '夜', singleNomalWorkerShift);
    if (getCoverData) {
      Object.keys(getCoverData).map((coverWorkerId: any) => {
        if (getCoverData[coverWorkerId].coverDay) {
          const getCoverDays = getCoverData[coverWorkerId].coverDay;
          getCoverDays.map((coverDay: number) => {
            const getCoverWorkerName = operation.checkNameExit(getWorkerData[getCoverData[coverWorkerId].coverWorker].name);
            singleNomalWorkerShift[coverDay - 1] = { 'type': '休', 'coverWorkerId': coverWorkerId, 'coverWorkerName': getCoverWorkerName };
          });
        }
      });
    }
    ctx.body = singleNomalWorkerShift;
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
    const getOldNomalWorkerId = ctx.request.body!.oldworkerid;
    const getNewNomalWorkerId = ctx.request.body!.newworkerid;
    const getNewShift = ctx.request.body!.shift;
    // search old countMark and delete countMark data
    // countMark nomal delete
    ctx.db.delete(`/calendar/${getYear}/${getMonth}/countMark/${getOldNomalWorkerId}/shift/${getStationId}-${getOldNomalWorkerId}`);
    const getNomalCountMarkOldShift = await operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/countMark/${getOldNomalWorkerId}/shift`);
    if (Object.keys(getNomalCountMarkOldShift).length === 0) {
      ctx.db.delete(`/calendar/${getYear}/${getMonth}/countMark/${getOldNomalWorkerId}`);
    }
    ctx.db.delete(`/calendar/${getYear}/${getMonth}/shift/${getStationId}/nomal/${getOldNomalWorkerId}`);
    // countMark cover
    const getOldCoverData = await operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getOldNomalWorkerId}/list`);
    Object.keys(getOldCoverData).map((oldCoverWokerId: any) => {
      // console.log(getOldCoverData[nomalWokerId]);
      // countMark cover delete
      const coverWorker = getOldCoverData[oldCoverWokerId].coverWorker;
      ctx.db.delete(`/calendar/${getYear}/${getMonth}/countMark/${coverWorker}/shift/${getStationId}-${getOldNomalWorkerId}`);
      // ctx.db.delete(`/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getOldNomalWorkerId}/list/${oldCoverWokerId}`);
    });
    ctx.db.delete(`/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getOldNomalWorkerId}`);
    // shift edit
    const nomalDays: any[] = [];
    const nomalNights: any[] = [];
    getNewShift.map((day: any, key: number) => {
      if (day.type === '日') {
        nomalDays.push(key + 1);
      } else if (day.type === '夜') {
        nomalNights.push(key + 1);
      } else if (day.type === '休') {
        const shiftCoverPath = `/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getNewNomalWorkerId}/list/${day.coverWorkerId}`;
        const getCoverList = operation.checkTable(ctx.db, `${shiftCoverPath}/coverDay`);
        getCoverList[getCoverList.length] = key + 1;
        ctx.db.push(shiftCoverPath, {
          coverWorker: day.coverWorkerId,
          coverDay: getCoverList
        });
      }
    });
    ctx.db.push(`/calendar/${getYear}/${getMonth}/shift/${getStationId}/nomal/${getNewNomalWorkerId}`, {
      day: nomalDays,
      night: nomalNights
    });
    // new countMark add
    const newNomalCountMarkPath = `/calendar/${getYear}/${getMonth}/countMark/${getNewNomalWorkerId}`;
    const newShiftKey = `${getStationId}-${getNewNomalWorkerId}`;
    const getCountMarkShiftLists = operation.checkTable(ctx.db, `${newNomalCountMarkPath}/shift/${newShiftKey}`);
    const newList = { 'station': getStationId, 'nomalWorker': getNewNomalWorkerId, 'type': 'nomal' };
    // tslint:disable-next-line:one-variable-per-declaration
    const newShift: {
      [key: string]: {
        station: string,
        nomalWorker: string,
        type: string
      }
    } = {};
    newShift[newShiftKey] = newList;
    if (Object.keys(getCountMarkShiftLists).length === 0) {
      const getNomalMarkShift = operation.checkTable(ctx.db, `${newNomalCountMarkPath}/shift`);
      if (Object.keys(getNomalMarkShift).length === 0) {
        ctx.db.push(newNomalCountMarkPath, {
          worker: getNewNomalWorkerId,
          shift: newShift
        });
      } else {
        getNomalMarkShift[newShiftKey] = newList;
        ctx.db.push(newNomalCountMarkPath, {
          worker: getNewNomalWorkerId,
          shift: getNomalMarkShift
        });
      }
    }

    const getNewShiftCoverList = await operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${getNewNomalWorkerId}/list`);
    const coverCountMarkShiftKey = `${getStationId}-${getNewNomalWorkerId}`;
    Object.keys(getNewShiftCoverList).map((coverWorker: any) => {
      const newCoverCountMarkPath = `/calendar/${getYear}/${getMonth}/countMark/${coverWorker}`;
      // console.log(coverCountMarkShiftKey);
      const checkMarkExit = operation.checkTable(ctx.db, `${newCoverCountMarkPath}/shift/${coverCountMarkShiftKey}`);
      // console.log(checkMarkExit);
      const newCoverList = { 'station': getStationId, 'nomalWorker': getNewNomalWorkerId, 'type': 'cover' };
      const newCoverShift: {
        [key: string]: {
          station: string,
          nomalWorker: string,
          type: string
        }
      } = {};
      newCoverShift[coverCountMarkShiftKey] = newCoverList;
      if (Object.keys(checkMarkExit).length === 0) {
        const getMarkShift = operation.checkTable(ctx.db, `${newCoverCountMarkPath}/shift`);
        if (Object.keys(getMarkShift).length === 0) {
          ctx.db.push(newCoverCountMarkPath, {
            worker: coverWorker,
            shift: newCoverShift
          });
        } else {
          getMarkShift[coverCountMarkShiftKey] = newCoverList;
          ctx.db.push(newCoverCountMarkPath, {
            worker: coverWorker,
            shift: getMarkShift
          });
        }
      }
    });
    ctx.body = 'yes';
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
    const getLastDay = new Date(getYear, getMonth, 0).getDate();
    // Get all stations
    const getStationData = await operation.checkTable(ctx.db, operation.getPath('all stations'));
    // Get all workers
    const getWorkerData = await operation.checkTable(ctx.db, operation.getPath('all workers'));
    // Divide stations group by area
    const getStationGroupByArea = await operation.groupByKey(getStationData, 'area', getStationArea);
    let stationCount = parseInt(getStationCount);
    let stationIndex = 0;
    Object.keys(getStationGroupByArea).map((area: string) => {
      const getArrayByArea = Object.values(getStationGroupByArea[area]);
      getArrayByArea.map((station: any) => {
        stationIndex++;
        if (parseInt(getStationStartId) <= stationIndex && stationCount !== 0) {
          // Get shifts by year,month and station
          const getStationShift = operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${station.id}`);
          if (getStationShift) {
            // Get nomal work day of station in getyear and  getmonth
            const getNomalShift = getStationShift.nomal;
            const totalWorkerShifts: any[] = [];
            if (getNomalShift) {
              Object.keys(getNomalShift).map((nomalWorkerId: any) => {
                const getNomalWorkerName = operation.checkNameExit(getWorkerData[nomalWorkerId].name);
                let getCover: any = [];
                let singleNomalWorkerShift = operation.initEveryDayPerMonth(getLastDay);
                // Get nomal day of station in this month
                singleNomalWorkerShift = operation.pushNomalDayTypeToShifts(getNomalShift[nomalWorkerId].day, '日', singleNomalWorkerShift);
                // Get nomal night of station in this month
                singleNomalWorkerShift = operation.pushNomalDayTypeToShifts(getNomalShift[nomalWorkerId].night, '夜', singleNomalWorkerShift);
                // Get cover work day of station in this month
                const getCoverShift = getStationShift.cover;
                if (getCoverShift[nomalWorkerId]) {
                  getCover = getCoverShift[nomalWorkerId].list;
                  if (getCover) {
                    Object.keys(getCover).map((coverWorkerId: any) => {
                      if (getCover[coverWorkerId].coverDay) {
                        const getCoverDays = getCover[coverWorkerId].coverDay;
                        getCoverDays.map((coverDay: number) => {
                          const getCoverWorkerName = operation.checkNameExit(getWorkerData[getCover[coverWorkerId].coverWorker].name);
                          singleNomalWorkerShift[coverDay - 1] = { 'type': '休', 'coverWorkerId': coverWorkerId, 'coverWorkerName': getCoverWorkerName};
                        });
                      }
                    });
                  }
                }
                totalWorkerShifts.push({ 'nomalWorkerId': nomalWorkerId, 'nomalWorkerName': getNomalWorkerName, 'dayShift': singleNomalWorkerShift });
              });
            }
            // check remain count of station's workerNumber
            if (totalWorkerShifts.length < parseInt(station.workerNumber)) {
              const remainNumber = parseInt(station.workerNumber) - totalWorkerShifts.length;
              for (let w = 1; w <= remainNumber; w++) {
                const singleNomalWorkerShift = operation.initEveryDayPerMonth(getLastDay);
                const shift = { 'nomalWorkerId': '無', 'nomalWorkerName': '無', 'dayShift': singleNomalWorkerShift };
                totalWorkerShifts.push(shift);
              }
            }
            totalStationShifts.push({ 'stationId': station.id, 'stationName': station.name, 'workerShift': totalWorkerShifts });
          }
          stationCount = stationCount - 1;
        }
      });
    });
    const data = { 'workers': getWorkerData, 'shifts': totalStationShifts, 'stationCounts': stationIndex };
    ctx.body = data;
  }
}

export default ShiftController;
