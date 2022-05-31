/* This function allows you to merge several classes together.
 * For conditional classes the first item in the array should be the condition (boolean)
 */
export const classNames = (...args: (string | [boolean, string])[]) => {
    return args.filter(className => {
        if (Array.isArray(className) && className[0]) {
            return className[1];
        }

        return className;
    }).join(' ')
};