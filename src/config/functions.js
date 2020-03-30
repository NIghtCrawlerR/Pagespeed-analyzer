import {
  HIGH,
  MID,
  LOW,
  RATINGS,
} from './constants';

export const getColorStatus = score => {
  switch (true) {
    case score > 90:
      return HIGH;
    case score >= 50 && score <= 90:
      return MID;
    case score < 50:
      return LOW;
    default:
      return null;
  }
}

export const showAsPassed = audit => {
  switch (audit.scoreDisplayMode) {
    case "manual":
    case "notApplicable":
      return true;
    case "error":
    case "informative":
      return false;
    case "numeric":
    case "binary":
    default:
      return Number(audit.score) >= RATINGS.PASS.minScore;
  }
}
