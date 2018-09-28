// TODO: following configuration should be in the spreadsheet

// Spreadsheet name and range
// training
const SPREADSHEET_TRAINING = "trening";
const SPREADSHEET_TRAINING_RANGE = SPREADSHEET_TRAINING + "!A8:Q33";
// diet
const SPREADSHEET_DIET = "dieta";
const SPREADSHEET_DIET_RANGE = SPREADSHEET_DIET + "!A4:K29";
// weight
const SPREADSHEET_WEIGHT = "waga";
const SPREADSHEET_WEIGHT_RANGE = SPREADSHEET_WEIGHT + "!A4:O29";

// columns
const TRAINING_TABLE_TENNIS = "tenis stołowy";
const TRAINING_SQUASH = "squash";

// App conf
const SPREADSHEETS_TO_LOAD = [SPREADSHEET_WEIGHT, SPREADSHEET_DIET, SPREADSHEET_TRAINING];
const SPREADSHEETS_RANGE_TO_LOAD = [SPREADSHEET_WEIGHT_RANGE, SPREADSHEET_DIET_RANGE, SPREADSHEET_TRAINING_RANGE];

const SPREADSHEET_CELL_VALUE_DELIMITER = "~";
const SPREADSHEET_CELL_VALUE_EMPTY = "-";
const SPREADSHEETS_SUPPORT_START_TIME = [SPREADSHEET_TRAINING, SPREADSHEET_DIET, SPREADSHEET_WEIGHT];

// For now for all spreadsheet
const COLUMNS_TO_SHOW_NAME_IN_DETAILS = [TRAINING_TABLE_TENNIS, TRAINING_SQUASH, SPREADSHEET_WEIGHT];

// TRAINING
const TRAINING_DURATION_COLUMN = 2;
const TRAINING_HEADER_INFORMATION_COLUMNS = ['kroki - mi band 3'];

// DIET
const DIET_START_TIME_COLUMN = 1;

// WEIGHT
const WEIGHT_START_TIME_COLUMN = 2;

// HELPERS MAP
// -1 start from 0; configuration contains business value
const START_TIME_COLUMN = {
    [SPREADSHEET_TRAINING] : (TRAINING_DURATION_COLUMN - 1),
    [SPREADSHEET_DIET] : (DIET_START_TIME_COLUMN - 1),
    [SPREADSHEET_WEIGHT] : (WEIGHT_START_TIME_COLUMN - 1)
}


// ICONS MAP

const ICONS = {
 "sniadanie" : "free_breakfast",
 "drugie sniadanie" : "fastfood",
 "obiad" : "room_service",
 "podwieczorek" : "fastfood",
 "kolacja" : "restaurant_menu",
 "Ważenie I" : "accessibility",
 "Ważenie II" : "accessibility",
 "Ważenie III" : "accessibility",
 "Ważenie IV" : "accessibility",
 "Ważenie V" : "accessibility",
 "Ważenie VI" : "accessibility",
 "Ważenie VII" : "accessibility",
 "spacer I" : "directions_run",
 "spacer II" : "directions_run",
 "spacer III" : "directions_run",
 "basen" : "pool",
 "siłownia" : "fitness_center",
 [TRAINING_SQUASH] : "toll",
 [TRAINING_TABLE_TENNIS] : "toll",
 "drzemka" : "local_hotel"
}

const DEFAULT_ICON = "warning";
 

// LABELS FOR OTHER(S) INFORMATION FOR EACH COLUMNS
const LABELS_OTHERS = {
  "basen" : ['distance'],
  "spacer I" : ['distance'],
  "spacer II" : ['distance'],
  "spacer III" : ['distance'],
  [TRAINING_SQUASH] : ['comment'],
  [TRAINING_TABLE_TENNIS] : ['comment'],
  "siłownia" : ['comment'],
  "sniadanie" : ["meal", "supplements"],
  "drugie sniadanie" : ["meal", "supplements"],
  "obiad" : ["meal", "supplements"],
  "podwieczorek" : ["meal", "supplements"],
  "kolacja" : ["meal", "supplements"]
}

const DEFAULT_LABEL = "other";

