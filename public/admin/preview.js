// Xem trước bài viết trong Decap, mô phỏng trang bài thật (src/pages/bai-viet/[slug].astro).
(function () {
  var CATS = { 'ca-phe': 'Cà phê', 'dbl-code': 'DBL Code', 'tai-san-so': 'Tài sản số', 'goc-vinh': 'Góc Vinh' };
  var h = window.h;

  var PostPreview = window.createClass({
    render: function () {
      var entry = this.props.entry;
      var d = function (k) { return entry.getIn(['data', k]); };
      var cat = d('category') || 'goc-vinh';
      var status = d('status');
      var verified = d('verified') === true;
      var cover = d('coverImage') ? this.props.getAsset(d('coverImage')) : null;
      var sources = (d('sources') && d('sources').toJS ? d('sources').toJS() : []).filter(function (s) { return s && s.title; });
      var date = d('publishedAt');
      var dateText = date ? new Date(date).toLocaleDateString('vi-VN') : '';

      var notes = [];
      if (status !== 'published') {
        notes.push(h('div', { className: 'pv-note', key: 'n1' }, '⚠️ Trạng thái đang là NHÁP: bài sẽ KHÔNG hiện trên web. Đổi sang "Đăng công khai" rồi bấm Publish.'));
      }
      if (cat === 'ca-phe' && !verified) {
        notes.push(h('div', { className: 'pv-note', key: 'n2' }, '⚠️ Mục Cà phê: chưa tick "Đã kiểm nguồn" nên bài sẽ KHÔNG hiện công khai, dù đã bấm Publish. Chỉ tick khi mọi số liệu trong bài đều có nguồn kiểm được.'));
      }
      if (status === 'published' && (cat !== 'ca-phe' || verified)) {
        notes.push(h('div', { className: 'pv-note ok', key: 'n3' }, '✔ Bài sẽ hiện công khai sau khi bấm Publish (khoảng 1 phút).'));
      }

      return h('div', { className: 'pv' },
        h('div', { className: 'pv-wrap' },
          notes,
          h('div', { className: 'pv-crumb' }, 'Trang chủ / Bài viết / ' + CATS[cat]),
          h('span', { className: 'pv-pill', 'data-cat': cat }, CATS[cat]),
          h('h1', null, d('title') || '(Chưa có tiêu đề)'),
          h('p', { className: 'pv-excerpt' }, d('excerpt') || ''),
          h('div', { className: 'pv-meta' },
            h('span', null, 'Phan Quang Vinh'),
            dateText ? h('span', null, dateText) : null,
            verified ? h('span', { style: { color: '#2f6a33', fontWeight: 600 } }, '✔ Đã kiểm nguồn') : null,
            d('hasAssumption') ? h('span', { style: { color: '#4a2815', fontWeight: 600 } }, 'Có số giả định') : null
          ),
          cover ? h('div', { className: 'pv-cover' }, h('img', { src: cover.toString(), alt: '' })) : null,
          h('div', { className: 'pv-body' }, this.props.widgetFor('body')),
          sources.length ? h('div', { className: 'pv-box' }, h('h4', null, 'Nguồn tham khảo'),
            h('ul', null, sources.map(function (s, i) { return h('li', { key: i }, s.title + (s.date ? ' (' + s.date + ')' : '')); }))) : null
        )
      );
    }
  });

  window.CMS.registerPreviewStyle('/admin/preview.css');
  window.CMS.registerPreviewTemplate('posts', PostPreview);
})();
