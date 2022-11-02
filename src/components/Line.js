import Segment from './Segment';

export default props => {
  const segments = () => {
    if (typeof props.cursor === 'number') {
      const segs = [];
      let len = 0;
      let i = 0;

      while (i < props.segments.length) {
        const seg = props.segments[i];
        const segLen = [...seg[0]].length;
        if (len + segLen - 1 >= props.cursor) break;
        segs.push(seg);
        len += segLen;
        i++;
      }

      if (i < props.segments.length) {
        const seg = props.segments[i];
        const cursorAttrsA = seg[1];
        const cursorAttrsB = new Map(cursorAttrsA);
        cursorAttrsB.set('inverse', !cursorAttrsB.get('inverse'));

        const pos = props.cursor - len;
        const chars = [...seg[0]];

        if (pos > 0) {
          segs.push([chars.slice(0, pos).join(''), seg[1]]);
        }

        segs.push([chars[pos], cursorAttrsA, ' cursor-a']);
        segs.push([chars[pos], cursorAttrsB, ' cursor-b']);

        if (pos < chars.length - 1) {
          segs.push([chars.slice(pos + 1).join(''), seg[1]]);
        }

        i++;

        while (i < props.segments.length) {
          const seg = props.segments[i];
          segs.push(seg);
          i++;
        }
      }

      return segs;
    } else {
      return props.segments;
    }
  }

  return (
    <span class="line" style={{height: props.height}}><Index each={segments()}>{s => <Segment text={s()[0]} attrs={s()[1]} extraClass={s()[2]} />}</Index></span>
  );
}
