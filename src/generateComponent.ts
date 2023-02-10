import { window, Uri } from "vscode";

import { useTemplate } from "./template";
import { writeFile, getSetting, openFile, normalize } from "./utilities";

async function writeComponentFiles(directory: string, componentName: string) {
  const apiStyle = getSetting("apiStyle", "composition");
  const useSetupAttribute = getSetting("useSetupAttribute", true);
  const scriptLang = getSetting("scriptLang", "ts");
  const templateLang = getSetting("templateLang", "html");
  const styleLang = getSetting("styleLang", "css");

  // Write component file
  const componentPath = `${directory}/${componentName}.vue`;
  const componentPromise = writeFile(
    componentPath,
    useTemplate(componentName, useSetupAttribute, {
      apiStyle,
      scriptLang,
      templateLang,
      styleLang,
    })
  );

  await componentPromise;

  openFile(componentPath);
}

// This is the function that gets registered to our command
export async function generateComponent(uri?: Uri) {
  if (!uri) {
    return window.showErrorMessage("No file path found.");
  }

  const componentName = await window.showInputBox({
    prompt: "Component name",
  });

  if (!componentName) {
    return window.showErrorMessage("No component name passed");
  }

  writeComponentFiles(normalize(uri.path), componentName);
}
