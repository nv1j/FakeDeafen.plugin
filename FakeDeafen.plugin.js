/**
 * @name FakeDeafen
 * @author !Lio (nv2j)
 * @authorId 888407517049258015
 * @version 1.2.0
 * @description Creates a fake deafen button that does nothing while keeping the real functionality hidden.
 * @invite clow
 */

module.exports = class FakeDeafen {
    constructor() {
        this.deafenRegex = /self_deafs.truem/;
        this.decoder = new TextDecoder();
        this.observer = null;
    }

    start() {
        this.hookWebSocket();
        this.observeButtons();
    }

    stop() {
        WebSocket.prototype.send = WebSocket.prototype._send;
        this.removeFakeButton();
        if (this.observer) this.observer.disconnect();
    }

    hookWebSocket() {
        const decoder = this.decoder;
        const deafenRegex = this.deafenRegex;

        WebSocket.prototype._send = WebSocket.prototype.send;
        WebSocket.prototype.send = function (data) {
            if (data instanceof ArrayBuffer && deafenRegex.test(decoder.decode(data))) {
                window.deafen = () => this._send(data);
                FakeDeafen.addFakeButton();
            }
            this._send(data);
        };
    }

    observeButtons() {
        const observer = new MutationObserver(() => FakeDeafen.addFakeButton());
        this.observer = observer;
        observer.observe(document.body, { childList: true, subtree: true });
    }

    static addFakeButton() {
        let deafenBtn = document.querySelector("button[aria-label='Deafen']");
        if (!deafenBtn || document.querySelector("#fakeDeafenBtn")) return;

        let fakeDeafenBtn = document.createElement("button");
        fakeDeafenBtn.id = "fakeDeafenBtn";
        fakeDeafenBtn.style.backgroundColor = "transparent";
        fakeDeafenBtn.style.border = "none";
        fakeDeafenBtn.style.borderRadius = "5px";
        fakeDeafenBtn.style.boxShadow = "0 1px 12px rgba(0, 0, 0, 0)";
        fakeDeafenBtn.style.padding = "1px";
        fakeDeafenBtn.style.cursor = "pointer";
        fakeDeafenBtn.style.display = "flex";
        fakeDeafenBtn.style.alignItems = "center";
        fakeDeafenBtn.style.justifyContent = "center";
        fakeDeafenBtn.style.transition = "transform 0.2s ease";
        fakeDeafenBtn.style.marginLeft = "1px";

        fakeDeafenBtn.onmouseover = () => fakeDeafenBtn.style.transform = "scale(1.05)";
        fakeDeafenBtn.onmouseleave = () => fakeDeafenBtn.style.transform = "scale(1)";

        const icon = document.createElement("img");
        icon.src = "https://media.discordapp.net/attachments/1398192371216158812/1398374555306692608/logo-removebg-preview.png?ex=6885214a&is=6883cfca&hm=cc4d4b78cbf773b3cddb9fd69ecc4b68f71ea4645da91f4e37b0df7021a82ec6&=&format=webp&quality=lossless"; // ✅ أيقونة جاهزة
        icon.alt = "Fake Deafen";
        icon.style.width = "25px";
        icon.style.height = "25px";
              
        fakeDeafenBtn.appendChild(icon);
        fakeDeafenBtn.onclick = () => window.deafen();

        deafenBtn.parentNode.appendChild(fakeDeafenBtn);
    }

    removeFakeButton() {
        let fakeDeafenBtn = document.querySelector("#fakeDeafenBtn");
        if (fakeDeafenBtn) fakeDeafenBtn.remove();
    }
};
