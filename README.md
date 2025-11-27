# FakeDeafen

A BetterDiscord plugin that replaces the default **Deafen** button with a realistic-looking fake button.  
The real functionality is hidden, but can still be triggered when needed.  
Perfect for UI experiments, demos, or avoiding accidental deafening.


---

## Logo
![Image](https://github.com/user-attachments/assets/24997f09-fa63-4340-bb1e-55c9316300f8)

---

## Features
- **Fake Deafen Button** — visually identical to the original.
- **WebSocket Hook** — intercepts the deafen packet for later use.
- **Automatic DOM Observation** — re-injects the fake button if the UI refreshes.
- **Clean Restore** — reverts WebSocket and removes the button when stopped.

---

## Installation
1. Download **FakeDeafen.plugin.js**.
2. Place it into your BetterDiscord `plugins` folder:
   - **Windows:** `%appdata%\BetterDiscord\plugins`
   - **macOS:** `~/Library/Application Support/BetterDiscord/plugins`
   - **Linux:** `~/.config/BetterDiscord/plugins`
3. Reload Discord or restart BetterDiscord.
4. Enable **FakeDeafen** from the Plugins tab.

---

## How It Works
- Hooks `WebSocket.prototype.send` to capture the **deafen** action packet.
- Stores it as `window.deafen()` so it can be called manually.
- Injects a **fake button** in the same location as the original.
- Clicking the fake button calls the stored `window.deafen()` function.
- Removes all changes when the plugin is stopped.

---

## Usage
1. Join a voice channel.
2. Click the fake deafen button — it will only trigger the real deafen packet when you want.
3. Disable the plugin to restore normal Discord behavior.

---

## Customization
- Change `icon.src` to use your own icon.
- Modify inline CSS in `addFakeButton()` to change style, size, or animations.
- Update the regex in `this.deafenRegex` if Discord changes its packet format.

---

## Troubleshooting
- **Button not appearing:** Make sure the aria-label of the real button is `Deafen` and you are in a voice call.
- **Fake button does nothing:** The plugin hasn’t captured a deafen packet yet; trigger the real deafen at least once.
- **Broken after update:** Discord may have changed its packet format or DOM layout.

---

## Warnings
- This is a client modification and may violate Discord’s Terms of Service.
- Use only for educational or personal testing purposes.
- Not intended for malicious use.

---

## Changelog
**1.2.0** — Stability fixes, observer disconnect on stop, style adjustments.  
**1.0.0** — Initial release.

---

## License
MIT License — free to use, modify, and distribute, but without any warranty.
