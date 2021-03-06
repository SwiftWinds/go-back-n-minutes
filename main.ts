import { isValid, parseISO, subMinutes } from "https://cdn.skypack.dev/date-fns@^2.27.0";

const promptForDate = () => {
  let date = parseISO(prompt("Enter date in strict ISO 8601 format:"));
  while (!isValid(date)) {
    console.log("ERROR: Invalid date");
    date = parseISO(prompt("Enter date in strict ISO 8601 format:"));
  }
  return date;
};

const promptForMinutes = () => {
  let minutesStr = prompt("Enter number of minutes:");
  let minutes;
  while (!minutesStr || isNaN(minutes = parseInt(minutesStr))) {
    console.log("ERROR: Invalid number");
    minutesStr = prompt("Enter number of minutes:");
  }
  return minutes;
};

const minutes = promptForMinutes();
while (true) {
  const date = promptForDate();
  const subbedDate = subMinutes(date, minutes);

  // git supports ISO 8601 timestamps: https://git-scm.com/docs/git-commit#_date_formats
  // do `git log --date=iso --pretty=format:'%aI' -n 1` to see the date
  // and then do `git commit --amend --date="<some ISO date string>" --no-edit`
  // if you `git rebase -i --root --committer-date-is-author-date`, do
  // `git filter-branch --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'` after rebasing
  console.log(subbedDate.toISOString());
}
