export const checkAvatarValidity = (avatarType: string): boolean => {
    const formats = ["jpeg", "gif", "png", "apng", "svg", "bmp", "jpg"];
    const type = avatarType.split('.').at(-1);

    if (type) {
        return formats.includes(type);
    }

    return false;
}