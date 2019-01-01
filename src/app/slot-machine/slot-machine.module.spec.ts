import { SlotMachineModule } from './slot-machine.module';

describe('SlotMachineModule', () => {
  let slotMachineModule: SlotMachineModule;

  beforeEach(() => {
    slotMachineModule = new SlotMachineModule();
  });

  it('should create an instance', () => {
    expect(slotMachineModule).toBeTruthy();
  });
});
