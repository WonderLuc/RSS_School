import { state } from '../State/State';
import {
  CarInterface,
  ICar,
  ICarSettings,
  IEngineData,
  IGarage,
  IWinner,
  IWinnersData,
} from '../types';

async function deleteCar(id: number): Promise<void> {
  const req = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'DELETE',
  });
  if (req.ok) {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'DELETE',
    });
    document.dispatchEvent(new CustomEvent('carsUpdated'));
  }
}

async function startCarEngine(id: number): Promise<IEngineData> {
  let res;
  try {
    const req = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=started`
    );
    if (req.ok) {
      res = await req.json();
    }
  } catch (err) {
    console.log(err);
  }
  return {
    velocity: res.velocity,
    distance: res.distance,
  };
}

async function switchEngineToDrive(id: number, obj: ICar): Promise<boolean> {
  try {
    const driveReq = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=drive`
    );
    if (driveReq.ok) {
      obj.isBroken = false;
      return true;
    }
    if (driveReq.status === 500) {
      obj.isBroken = true;
      obj.rideTime = undefined;
      obj.isFinsed = false;
      throw new Error();
    }
  } catch (err) {
    console.log(`Car ${obj.carData?.name} is broken`);
  }
  return false;
}

async function stopCarEngine(obj: ICar): Promise<void> {
  try {
    const req = await fetch(
      `http://127.0.0.1:3000/engine?id=${obj.carData?.id}&status=stopped`
    );
    if (req.ok) {
      obj.velocityPercent = 0;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addCar(obj: ICarSettings): Promise<Response> {
  const req = await fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    body: JSON.stringify(obj.carData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return req;
}

async function updateCar(): Promise<void> {
  const req = await fetch(
    `http://127.0.0.1:3000/garage/${state.updateCarData?.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(state.updateCarData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (req.ok) {
    document.dispatchEvent(new CustomEvent('carsUpdated'));
  }
}

async function sendWinner(obj: IGarage): Promise<void> {
  try {
    const req = await fetch(
      `http://127.0.0.1:3000/winners/${obj.currentWinner?.carData.id}`
    );
    if (req.ok) {
      const res = await req.json();
      let time = obj.currentWinner?.rideTime;
      if (time) time /= 1000;
      await fetch(
        `http://127.0.0.1:3000/winners/${obj.currentWinner?.carData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wins: res.wins + 1,
            time: time && time < res.time ? time : res.time,
          }),
        }
      );
    } else {
      throw new Error();
    }
  } catch (err) {
    let time = obj.currentWinner?.rideTime;
    if (time) time /= 1000;
    await fetch(`http://127.0.0.1:3000/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: obj.currentWinner?.carData.id,
        wins: 1,
        time,
      }),
    });
    console.log('Winner added');
  }
}

async function getCars(): Promise<CarInterface[] | undefined> {
  let res;
  const req = await fetch('http://127.0.0.1:3000/garage');
  if (req.ok) {
    res = await req.json();
    return [...res];
  }
  return res;
}

async function getWinner(obj: IWinner): Promise<void> {
  try {
    const req = await fetch(`http://127.0.0.1:3000/garage/${obj.id}`);
    if (req.ok) {
      const res = await req.json();
      obj.name = res.name;
      obj.color = res.color;
      obj.render();
    } else {
      throw new Error('No That Winner');
    }
  } catch (err) {
    console.log(err);
  }
}

async function getWinners(): Promise<IWinnersData[] | undefined> {
  let res;
  const req = await fetch('http://127.0.0.1:3000/winners');
  if (req.ok) {
    res = await req.json();
    return [...res];
  }
  return res;
}

export const Api = {
  deleteCar,
  startCarEngine,
  switchEngineToDrive,
  stopCarEngine,
  addCar,
  updateCar,
  sendWinner,
  getCars,
  getWinner,
  getWinners,
};
