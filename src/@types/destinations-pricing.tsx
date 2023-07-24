import { IDestinationBranch } from '@/@types/destination-branch';

export interface IDestinationsPricing {
  id: string;
  branch_a: IDestinationBranch;
  branch_b: IDestinationBranch;
  shipping_office_id: string;
  small_package_cost: string;
  medium_package_cost: string;
  large_package_cost: string;
  light_package_cost_percentage_multiplier: number;
  medium_package_cost_percentage_multiplier: number;
  heavy_package_cost_percentage_multiplier: number;
  is_active: number;
  door_to_door:any;
  estimated_time:any;
}

export type DestinationsPricingType = {
  destinations: IDestinationsPricing[];
  saveDestination: (destinations: DestinationsPricingType) => void;
  updateDestination: (id: string) => void;
};