'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "automatic-semicolon" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('automaticSemicolon.endLine', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {

        let lineNumber = textEditor.selection.active.line;
        let line = textEditor.document.lineAt(lineNumber);

        if (!line.text.trim().endsWith(";")) {
            edit.insert(line.range.end, ";");
            textEditor.selection = new vscode.Selection(line.range.end, line.range.end);
        } else {
            if (textEditor.selection.isEmpty)
                edit.insert(textEditor.selection.start, ";");
            else
                edit.replace(textEditor.selection, ";");
        }
    });

    //let disposable_ = vscode.languages.registerCodeActionsProvider("csharp", new AutomaticSemicolonCodeActionProvider());
    context.subscriptions.push(disposable);
    //context.subscriptions.push(disposable_);
}

// this method is called when your extension is deactivated
export function deactivate() {
}